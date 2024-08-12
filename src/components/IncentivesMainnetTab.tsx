import { useState, useEffect } from "react"
import { VStack, HStack, Text, Spinner, Button, Link } from "@chakra-ui/react"
import NextLink from "next/link"

import useFetchLatestFile from "@/hooks/useFetchLatestFile"
import useFetchPreviouslyClaimedRewards from "@/hooks/useFetchPreviouslyClaimedRewards"

import { useAccount } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"

import SendTransactionButton from "./SendTransactionButton"

export default function IncentivesMainnetTab({ address }) {
    const rewardsType = "mainnetIncentives"

    const [merkleProof, setMerkleProof] = useState(null)
    const [merkleProofDate, setMerkleProofDate] = useState(null)
    const [merkleProofEntry, setMerkleProofEntry] = useState(null)
    const [previouslyClaimedRewards, setPreviouslyClaimedRewards] = useState(null)
    const [unclaimedRewards, setUnclaimedRewards] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [minimumDelayLoading, setMinimumDelayLoading] = useState(true)
    const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false)
    const [transactionHash, setTransactionHash] = useState(null)

    const { isConnected } = useAccount()
    const { openConnectModal } = useConnectModal()

    // UseEffect - Fetch the latest Merkle Proof file
    useFetchLatestFile(setMerkleProof, setMerkleProofDate, rewardsType)

    // UseEffect - When `address` has a value, check to see if it is in the Merkle Proof and get previously claimed rewards
    const fetchPreviouslyClaimedRewardsResult = useFetchPreviouslyClaimedRewards(
        rewardsType,
        address,
        merkleProof,
        setMerkleProofEntry,
        setPreviouslyClaimedRewards,
        setIsLoading,
        isTransactionConfirmed
    )

    // UseEffect - Calculate the unclaimed rewards
    useEffect(() => {
        if (merkleProofEntry) {
            setUnclaimedRewards(merkleProofEntry.amount - previouslyClaimedRewards)
        } else {
            setUnclaimedRewards(null)
        }
    }, [merkleProofEntry, previouslyClaimedRewards])

    // UseEffect - When address changes
    // - Add a minimum delay to the loading spinner so that it doesn't flash too quickly to see
    // - Reset the transaction confirmation state
    useEffect(() => {
        setIsTransactionConfirmed(false)
        setMinimumDelayLoading(true)
        setTimeout(() => {
            setMinimumDelayLoading(false)
        }, 600)
    }, [address])

    if (minimumDelayLoading || isLoading) {
        return (
            <HStack justifyContent={"center"} minH={"350px"}>
                <Spinner />
                <Text>Loading...</Text>
            </HStack>
        )
    }

    return (
        <VStack gap={6} width="100%" p={3} textAlign={"center"} fontWeight={"semibold"}>
            <VStack gap={1}>
                <Text>Latest Results Calculation </Text>
                <Text color={"gold"} fontSize={"xl"}>
                    {merkleProofDate}
                </Text>
            </VStack>
            {!isTransactionConfirmed ? (
                <VStack gap={1}>
                    <VStack gap={0}>
                        <Text fontSize={"2xl"}>{fetchPreviouslyClaimedRewardsResult?.success ? "Unclaimed" : "Total"} Rewards</Text>
                        {fetchPreviouslyClaimedRewardsResult && !fetchPreviouslyClaimedRewardsResult.success && (
                            <Text>(Including any previously claimed)</Text>
                        )}
                    </VStack>
                    <HStack gap={6} fontSize={"3xl"} color={unclaimedRewards > 0 ? "green" : "none"}>
                        <Text>{unclaimedRewards > 0 ? "🥳" : "😔"}</Text>
                        <Text>{formatSSVAmount(unclaimedRewards)} SSV</Text>
                        <Text>{unclaimedRewards > 0 ? "🥳" : "😔"}</Text>
                    </HStack>
                    {fetchPreviouslyClaimedRewardsResult && !fetchPreviouslyClaimedRewardsResult.success && (
                        <VStack gap={3}>
                            <Text>
                                The network could not be contacted to calculate how many rewards you have previously claimed. If you have previously
                                claimed any rewards then the number shown above is also including those claimed rewards.
                            </Text>
                            <Text>
                                You can still use this page to claim your unclaimed rewards as the calculation is performed directly on the smart
                                contract.
                            </Text>
                            <Text>
                                If you have already claimed all your available rewards then you will see a message below saying &quot;Nothing to
                                claim&quot; when you click the &quot;Claim Rewards&quot; button.
                            </Text>
                        </VStack>
                    )}
                </VStack>
            ) : (
                <VStack pb={3}>
                    <HStack gap={3} fontSize={"3xl"} color={unclaimedRewards > 0 ? "green" : "none"}>
                        <Text>✅</Text>
                        <Text>Rewards successfully claimed!</Text>
                        <Text>✅</Text>
                    </HStack>
                    <Text>Thank you for being part of the SSV Network</Text>
                    {transactionHash && (
                        <Text>
                            View transaction{" "}
                            <Link
                                as={NextLink}
                                href={`https://etherscan.io/tx/${transactionHash}`}
                                color={"blue"}
                                textDecoration={"underline"}
                                target="_blank"
                            >
                                on Etherscan ↗
                            </Link>
                        </Text>
                    )}
                </VStack>
            )}

            {unclaimedRewards > 0 && isConnected && (
                <SendTransactionButton
                    rewardsType={rewardsType}
                    merkleProofRoot={merkleProof.root}
                    merkleProofEntry={merkleProofEntry}
                    setIsTransactionConfirmed={setIsTransactionConfirmed}
                    setTransactionHash={setTransactionHash}
                />
            )}
            {unclaimedRewards > 0 && !isConnected && (
                <Button
                    w={"100%"}
                    maxW={"400px"}
                    py={4}
                    px={8}
                    variant={"ConnectWalletButton"}
                    fontSize={"lg"}
                    borderRadius={"full"}
                    whiteSpace={"normal"}
                    minH={"60px"}
                    h="fit-content"
                    onClick={async () => {
                        openConnectModal()
                    }}
                >
                    Connect a wallet to claim rewards
                </Button>
            )}
            {!isTransactionConfirmed && (!unclaimedRewards || unclaimedRewards == 0) && (
                <VStack gap={2} className={"bgPage"} borderRadius={"20px"} py={3} px={5}>
                    <Text>It looks like you do not have any rewards to claim right now.</Text>
                    <Text>Try checking again when the results have been updated.</Text>
                </VStack>
            )}
            {merkleProofEntry && (
                <VStack>
                    <Text>Total previously claimed rewards</Text>
                    {fetchPreviouslyClaimedRewardsResult?.success ? (
                        <Text color={previouslyClaimedRewards > 0 ? "green" : null}>{formatSSVAmount(previouslyClaimedRewards)} SSV</Text>
                    ) : (
                        <Text color={"red"}>Unable to fetch previously claimed rewards</Text>
                    )}
                </VStack>
            )}
            <Text>
                View and interact with the rewards contract{" "}
                <Link
                    as={NextLink}
                    href={"https://etherscan.io/address/0xe16d6138B1D2aD4fD6603ACdb329ad1A6cD26D9f#code"}
                    color={"blue"}
                    textDecoration={"underline"}
                    target="_blank"
                >
                    on Etherscan ↗
                </Link>
            </Text>
        </VStack>
    )
}

function formatSSVAmount(amount) {
    return (amount / 1e18).toFixed(4)
}
