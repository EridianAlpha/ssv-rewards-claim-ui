import { useState } from "react"
import { VStack, Button, Input } from "@chakra-ui/react"

import { ethers } from "ethers"

export default function AddressInput({ rewardsAddress, setRewardsAddress }) {
    const [addressInputValue, setAddressInputValue] = useState(rewardsAddress || "")
    const [isRewardsAddressError, setIsRewardsAddressError] = useState(false)

    const handleInputChange = (event) => {
        setRewardsAddress(null)
        setAddressInputValue(event.target.value)
        setIsRewardsAddressError(false)
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleButtonClick()
        }
    }

    const handleButtonClick = () => {
        if (ethers.isAddress(addressInputValue)) {
            setIsRewardsAddressError(false)
            setRewardsAddress(addressInputValue)
        } else {
            setIsRewardsAddressError(true)
            setRewardsAddress(null)
        }
    }

    return (
        <VStack gap={0} w="100%">
            <Input
                p={5}
                w={"100%"}
                maxW={"480px"}
                borderTopRadius={"20px"}
                borderBottomRadius={!rewardsAddress && addressInputValue ? "0px" : "20px"}
                fontFamily={"monospace"}
                placeholder="0x..."
                value={addressInputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                border={"none"}
                variant={"AddressInput"}
            />
            {!rewardsAddress && addressInputValue && (
                <Button
                    variant={!isRewardsAddressError ? "ShowResultsButton" : "ShowResultsButtonError"}
                    borderBottomRadius={"20px"}
                    borderTopRadius={"0px"}
                    maxW={"480px"}
                    width="100%"
                    whiteSpace="normal"
                    overflow="visible"
                    textOverflow="clip"
                    onClick={handleButtonClick}
                >
                    {isRewardsAddressError ? "Invalid address - Please use a valid Ethereum address" : "Check rewards"}
                </Button>
            )}
        </VStack>
    )
}
