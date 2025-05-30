import { useState, useEffect } from "react"
import { VStack, HStack, Text, Spinner, Button, Link, Checkbox, Box } from "@chakra-ui/react"
import NextLink from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpRightFromSquare, faSatelliteDish } from "@fortawesome/free-solid-svg-icons"

import useFetchLatestFile from "@/hooks/useFetchLatestFile"
import useFetchPreviouslyClaimedRewards from "@/hooks/useFetchPreviouslyClaimedRewards"

import { useAccount } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"

import { contracts } from "public/data/contracts"

import SendTransactionButton from "./SendTransactionButton"

export default function IncentivesMainnetTab({ address, customRpc, rewardsType }) {
    const [merkleProof, setMerkleProof] = useState(null)
    const [merkleProofDate, setMerkleProofDate] = useState(null)
    const [merkleProofEntry, setMerkleProofEntry] = useState(null)
    const [previouslyClaimedRewards, setPreviouslyClaimedRewards] = useState(null)
    const [unclaimedRewards, setUnclaimedRewards] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [minimumDelayLoading, setMinimumDelayLoading] = useState(true)
    const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false)
    const [transactionHash, setTransactionHash] = useState(null)
    const [isTermsAccepted, setIsTermsAccepted] = useState(false)
    const cumulativeMerkleDropAddress = contracts.cumulativeMerkleDrop[rewardsType]

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
        isTransactionConfirmed,
        customRpc
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
                        <Text>{Number(formatSSVAmount(unclaimedRewards)) < 0 ? "0.0000" : formatSSVAmount(unclaimedRewards)} SSV</Text>
                        <Text>{unclaimedRewards > 0 ? "🥳" : "😔"}</Text>
                    </HStack>
                    {fetchPreviouslyClaimedRewardsResult && !fetchPreviouslyClaimedRewardsResult.success && (
                        <VStack gap={3}>
                            <Text>If you have previously claimed any rewards then the number shown above also includes those claimed rewards.</Text>
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
                                on Etherscan <FontAwesomeIcon icon={faUpRightFromSquare} size={"sm"} />
                            </Link>
                        </Text>
                    )}
                </VStack>
            )}

            {unclaimedRewards > 0 && isConnected && (
                <VStack gap={3}>
                    <Text color={"gray.300"}>
                        By accessing or using this claim page, I agree to the{" "}
                        <Link as={NextLink} href={`https://ssv.network/terms-of-service`} color={"blue"} textDecoration={"underline"} target="_blank">
                            Terms of Service
                        </Link>{" "}
                        of the SSV Network, confirm that I have read and understood the terms of the{" "}
                        <Link
                            as={NextLink}
                            href={`https://ssv.network/incentivized-mainnet-terms-and-conditions`}
                            color={"blue"}
                            textDecoration={"underline"}
                            target="_blank"
                        >
                            Incentivized Mainnet Program
                        </Link>{" "}
                        for{" "}
                        <Link
                            as={NextLink}
                            href={`https://ssv.network/incentivized-mainnet`}
                            color={"blue"}
                            textDecoration={"underline"}
                            target="_blank"
                        >
                            ssv.network
                        </Link>
                        , and have read the{" "}
                        <Link
                            as={NextLink}
                            href={`https://ssv.network/incentivized-mainnet-faq`}
                            color={"blue"}
                            textDecoration={"underline"}
                            target="_blank"
                        >
                            FAQ
                        </Link>
                        .
                    </Text>
                    <Box border={"2px solid"} borderRadius={"full"} p={3} mb={isTermsAccepted ? 0 : "84px"}>
                        <Checkbox isChecked={isTermsAccepted} onChange={(e) => setIsTermsAccepted(e.target.checked)}>
                            I accept the terms & conditions
                        </Checkbox>
                    </Box>
                </VStack>
            )}

            {unclaimedRewards > 0 && isConnected && isTermsAccepted && (
                <SendTransactionButton
                    rewardsType={rewardsType}
                    merkleProofRoot={merkleProof.root}
                    merkleProofEntry={merkleProofEntry}
                    setIsTransactionConfirmed={setIsTransactionConfirmed}
                    setTransactionHash={setTransactionHash}
                    customRpc={customRpc}
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
            {!isTransactionConfirmed && (!unclaimedRewards || unclaimedRewards <= 0) && (
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
                    {!fetchPreviouslyClaimedRewardsResult?.success && (
                        <>
                            <Text color={"red"}>Failed to connect to the RPC URL:</Text>
                            <Text color={"red"}>{customRpc || process.env.NEXT_PUBLIC_JSON_RPC}</Text>
                            <Text>
                                You can use a different RPC URL by clicking the <FontAwesomeIcon icon={faSatelliteDish} /> icon in the header.
                            </Text>
                        </>
                    )}
                </VStack>
            )}
            <Text>
                View and interact with the rewards contract{" "}
                <Link
                    as={NextLink}
                    href={`https://etherscan.io/address/${cumulativeMerkleDropAddress}#code`}
                    color={"blue"}
                    textDecoration={"underline"}
                    target="_blank"
                >
                    on Etherscan <FontAwesomeIcon icon={faUpRightFromSquare} size={"sm"} />
                </Link>
            </Text>
        </VStack>
    )
}

function formatSSVAmount(amount) {
    return (amount / 1e18).toFixed(4)
}
