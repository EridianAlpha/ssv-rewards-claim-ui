import { VStack, Text, Button } from "@chakra-ui/react"

import { useConnectModal } from "@rainbow-me/rainbowkit"

import AddressInput from "./AddressInput"

export default function AddressSelector({ rewardsAddress, setRewardsAddress }) {
    const { openConnectModal } = useConnectModal()

    return (
        <>
            <Text fontWeight={"extrabold"} fontSize={"3xl"} textAlign={"center"}>
                Claim all your SSV rewards here
            </Text>
            <Button
                px={"80px"}
                py={6}
                variant={"ConnectWalletButton"}
                fontSize={"lg"}
                borderRadius={"full"}
                maxW={"95vw"}
                onClick={() => {
                    openConnectModal()
                }}
            >
                Connect wallet
            </Button>
            <Text fontSize={"xl"} fontWeight={"bold"}>
                OR
            </Text>
            <VStack gap={5} w={"100%"}>
                <Text textAlign={"center"} maxW={"90vw"} fontWeight={"semibold"}>
                    Enter an Ethereum address to view your rewards
                </Text>
                <AddressInput rewardsAddress={rewardsAddress} setRewardsAddress={setRewardsAddress} />
            </VStack>
        </>
    )
}
