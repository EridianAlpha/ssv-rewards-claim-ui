import { useEffect, useState } from "react"
import { VStack, Text, HStack, Button, Checkbox } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

import { useAccount, useDisconnect } from "wagmi"

import AddressInput from "./AddressInput"

export default function CurrentAddressInfo({ rewardsAddress, setRewardsAddress }) {
    const [isExpanded, setIsExpanded] = useState(rewardsAddress ? true : false)

    const { address: connectedWalletAddress, isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    useEffect(() => {
        if (!isExpanded) {
            setRewardsAddress(null)
        }
    }, [isExpanded])

    const WalletButton = ({ buttonText, height }) => {
        return (
            <Button
                variant={"WalletButton"}
                aria-label={"Wallet button"}
                borderRadius={"full"}
                px={3}
                h={height}
                onClick={() => {
                    setRewardsAddress()
                    disconnect()
                }}
            >
                <HStack gap={3}>
                    <Text>{buttonText}</Text>
                    <FontAwesomeIcon icon={faRightFromBracket} size={"lg"} />
                </HStack>
            </Button>
        )
    }

    return (
        <VStack gap={3} cursor={"default"}>
            <VStack className="currentAddressInfoContainer" p={3} borderRadius={"20px"} maxW="95vw" gap={3}>
                <HStack w={"100%"} justifyContent={isConnected ? "space-between" : "center"} pl={2} pr={1}>
                    <Text fontWeight={"bold"} fontSize={"xl"} whiteSpace="normal" overflow="visible" textOverflow="clip" textAlign={"center"}>
                        {!isConnected ? "Viewing read-only rewards for address" : "Connected wallet"}
                    </Text>
                    {isConnected && <WalletButton buttonText={"Disconnect"} height={8} />}
                </HStack>
                <Text
                    fontFamily={"monospace"}
                    fontSize={"lg"}
                    className="bgPage"
                    py={1}
                    px={3}
                    borderRadius={"full"}
                    whiteSpace="normal"
                    overflow="visible"
                    textOverflow="clip"
                    wordBreak="break-word"
                >
                    {connectedWalletAddress || rewardsAddress}
                </Text>
                {isConnected && (
                    <VStack w={"100%"} gap={2} pt={3} pl={1}>
                        <HStack w={"100%"}>
                            <Checkbox size={"lg"} pl={1} pr={3} isChecked={isExpanded} onChange={() => setIsExpanded(!isExpanded)}>
                                <Text>Claim rewards on behalf of a different address</Text>
                            </Checkbox>
                        </HStack>
                        {isExpanded && (
                            <VStack className="bgPage" w={"100%"} borderRadius={"30px"} px={3} py={3}>
                                <AddressInput rewardsAddress={rewardsAddress} setRewardsAddress={setRewardsAddress} />
                            </VStack>
                        )}
                    </VStack>
                )}
            </VStack>
            {!isConnected && <WalletButton buttonText={"View another address"} height={10} />}
        </VStack>
    )
}
