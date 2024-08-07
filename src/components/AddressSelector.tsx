import { useState } from "react"
import { VStack, Text, Button, Input } from "@chakra-ui/react"

import { ethers } from "ethers"

export default function AddressSelector({ setReadOnlyAddress }) {
    const [addressInputValue, setAddressInputValue] = useState("")
    const [isReadOnlyAddressError, setIsReadOnlyAddressError] = useState(false)

    const handleInputChange = (event) => {
        setAddressInputValue(event.target.value)
        setIsReadOnlyAddressError(false)
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleButtonClick()
        }
    }

    const handleButtonClick = () => {
        if (ethers.isAddress(addressInputValue)) {
            setIsReadOnlyAddressError(false)
            setReadOnlyAddress(addressInputValue)
        } else {
            setIsReadOnlyAddressError(true)
            setReadOnlyAddress(null)
        }
    }

    return (
        <>
            <Text fontWeight={"extrabold"} fontSize={"3xl"} textAlign={"center"}>
                Claim all your SSV Rewards here
            </Text>
            <Button px={"80px"} py={6} variant={"ConnectWalletButton"} fontSize={"lg"} fontWeight={"bold"} borderRadius={"full"} maxW={"95vw"}>
                Connect wallet
            </Button>
            <Text fontSize={"xl"} fontWeight={"bold"}>
                OR
            </Text>
            <VStack gap={5} w={"100%"}>
                <Text textAlign={"center"} maxW={"90vw"} fontWeight={"bold"}>
                    Enter an Ethereum address to view your rewards
                </Text>
                <VStack gap={0} w="100%">
                    <Input
                        p={5}
                        w={"100%"}
                        borderTopRadius={"20px"}
                        borderBottomRadius={addressInputValue ? "0px" : "20px"}
                        fontFamily={"monospace"}
                        placeholder="0x..."
                        value={addressInputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        border={"none"}
                        variant={"AddressInput"}
                    />
                    {addressInputValue && (
                        <Button
                            variant={!isReadOnlyAddressError ? "ShowResultsButton" : "ShowResultsButtonError"}
                            fontWeight={"bold"}
                            borderBottomRadius={"20px"}
                            borderTopRadius={"0px"}
                            maxW={"95vw"}
                            width="100%"
                            whiteSpace="normal"
                            overflow="visible"
                            textOverflow="clip"
                            onClick={handleButtonClick}
                        >
                            {isReadOnlyAddressError ? "Invalid address - Please enter a valid Ethereum address" : "Find rewards"}
                        </Button>
                    )}
                </VStack>
            </VStack>
        </>
    )
}
