import { VStack, Text, HStack, Button } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faRightFromBracket, faRotate } from "@fortawesome/free-solid-svg-icons"

export default function CurrentAddressInfo({ currentAddress, addressType, resetAddress }) {
    return (
        <VStack gap={3} cursor={"default"}>
            <VStack className="currentAddressInfoContainer" p={3} borderRadius={"20px"} maxW="95vw">
                <Text fontWeight={"bold"} fontSize={"lg"} whiteSpace="normal" overflow="visible" textOverflow="clip" textAlign={"center"}>
                    {addressType === "readOnlyAddress" ? "Viewing read-only rewards for address" : "Connected wallet"}
                </Text>
                <Text
                    fontFamily={"monospace"}
                    fontSize={"lg"}
                    className="contentContainer"
                    py={1}
                    px={3}
                    borderRadius={"full"}
                    whiteSpace="normal"
                    overflow="visible"
                    textOverflow="clip"
                    wordBreak="break-word"
                >
                    {currentAddress}
                </Text>
            </VStack>
            <Button
                variant={"ChangeWalletButton"}
                aria-label={"Change wallet"}
                borderRadius={"full"}
                px={3}
                h={8}
                onClick={() => {
                    resetAddress()
                }}
            >
                <HStack gap={3}>
                    <Text>Change {addressType === "readOnlyAddress" ? "address" : "wallet"}</Text>
                    <FontAwesomeIcon icon={faRightFromBracket} size={"lg"} />
                </HStack>
            </Button>
        </VStack>
    )
}
