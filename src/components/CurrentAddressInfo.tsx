import { useEffect, useState } from "react"
import { VStack, Text, HStack, Button, Checkbox } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

import { useAccount, useDisconnect } from "wagmi"

import AddressInput from "./AddressInput"

export default function CurrentAddressInfo({ rewardsAddress, setRewardsAddress, useAlternativeAddress, setUseAlternativeAddress }) {
    const { address: connectedWalletAddress, isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    // UseEffect - When the user toggles the alternative address checkbox, reset the rewards address
    useEffect(() => {
        if (isConnected && !useAlternativeAddress) {
            setRewardsAddress(null)
        }
    }, [useAlternativeAddress])

    const WalletButton = ({ buttonText, height }) => {
        return (
            <Button
                variant={"WalletButton"}
                aria-label={"Wallet button"}
                borderRadius={"full"}
                px={3}
                h={height}
                onClick={() => {
                    setUseAlternativeAddress()
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
            <VStack className="currentAddressInfoContainer" p={4} borderRadius={"20px"} maxW="95vw" gap={3}>
                <HStack w={"100%"} justifyContent={isConnected ? "space-between" : "center"} pl={2} pr={1}>
                    <Text fontWeight={"bold"} fontSize={"lg"} whiteSpace="normal" overflow="visible" textOverflow="clip" textAlign={"center"}>
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
                        <VStack w={"100%"} alignItems={"start"}>
                            <Checkbox
                                size={"lg"}
                                pl={1}
                                pr={3}
                                isChecked={useAlternativeAddress}
                                onChange={() => setUseAlternativeAddress(!useAlternativeAddress)}
                            >
                                <Text>Claim rewards on behalf of a different address</Text>
                            </Checkbox>
                        </VStack>
                        {useAlternativeAddress && (
                            <VStack className="bgPage" w={"100%"} borderRadius={"30px"} px={3} py={3}>
                                <AddressInput rewardsAddress={rewardsAddress} setRewardsAddress={setRewardsAddress} />
                                {rewardsAddress?.toLowerCase() == connectedWalletAddress?.toLowerCase() && (
                                    <VStack gap={0} color="gold" textAlign={"center"}>
                                        <Text>⚠️ Connected wallet and reward wallet are the same ⚠️</Text>
                                        <Text>Did you mean to use the same wallet twice?</Text>
                                    </VStack>
                                )}
                            </VStack>
                        )}
                    </VStack>
                )}
            </VStack>
            {!isConnected && <WalletButton buttonText={"Check another address"} height={10} />}
        </VStack>
    )
}
