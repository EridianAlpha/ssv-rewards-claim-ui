import { useState } from "react"
import { Box, VStack, Text, Button, Input } from "@chakra-ui/react"

import RewardProgramTabs from "./RewardProgramTabs"

export default function RewardsContainer() {
    const [addressInputValue, setAddressInputValue] = useState("")

    const handleInputChange = (event) => {
        setAddressInputValue(event.target.value)
    }

    return (
        <VStack gap={6} maxW={"450px"}>
            <Button px={"80px"} py={6} variant={"ConnectWallet"} fontSize={"lg"} fontWeight={"bold"} borderRadius={"full"} maxW={"95vw"}>
                Connect wallet
            </Button>
            <Text fontSize={"xl"} fontWeight={"bold"}>
                OR
            </Text>
            <VStack gap={2}>
                <Text textAlign={"center"} maxW={"90vw"}>
                    Enter an Ethereum address for a view-only lookup
                </Text>
                <VStack gap={0} width="100%">
                    <Input
                        p={5}
                        maxW={"95vw"}
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
                        <Button variant={"ShowResults"} fontWeight={"bold"} borderBottomRadius={"20px"} borderTopRadius={"0px"} width="100%">
                            View read-only rewards
                        </Button>
                    )}
                </VStack>
            </VStack>
            <RewardProgramTabs />
        </VStack>
    )
}
