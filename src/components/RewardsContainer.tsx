import { useState } from "react"
import { Box, VStack, Text, Button, Input } from "@chakra-ui/react"

import RewardProgramTabs from "./RewardProgramTabs"

export default function RewardsContainer() {
    const [addressInputValue, setAddressInputValue] = useState("")

    const handleInputChange = (event) => {
        setAddressInputValue(event.target.value)
    }

    return (
        <VStack gap={6} w={"100%"} maxW={"95vw"}>
            <Button px={"80px"} py={6} variant={"ConnectWalletButton"} fontSize={"lg"} fontWeight={"bold"} borderRadius={"full"} maxW={"95vw"}>
                Connect wallet
            </Button>
            <Text fontSize={"xl"} fontWeight={"bold"}>
                OR
            </Text>
            <VStack gap={2} w={"100%"}>
                <Text textAlign={"center"} maxW={"90vw"}>
                    Enter an Ethereum address for a view-only lookup:
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
                        border={"none"}
                        variant={"AddressInput"}
                    />
                    {addressInputValue && (
                        <Button
                            variant={"ShowResultsButton"}
                            fontWeight={"bold"}
                            borderBottomRadius={"20px"}
                            borderTopRadius={"0px"}
                            maxW={"95vw"}
                            width="100%"
                        >
                            View read-only rewards
                        </Button>
                    )}
                </VStack>
            </VStack>
            <RewardProgramTabs />
        </VStack>
    )
}
