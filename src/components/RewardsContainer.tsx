import { useState } from "react"
import { VStack, Text } from "@chakra-ui/react"

import RewardProgramTabs from "./RewardProgramTabs"
import AddressSelector from "./AddressSelector"
import CurrentAddressInfo from "./CurrentAddressInfo"

import { useAccount } from "wagmi"

export default function RewardsContainer() {
    const [rewardsAddress, setRewardsAddress] = useState(null)
    const { address: connectedWalletAddress, isConnected } = useAccount()

    return (
        <VStack gap={10} w={"600px"} maxW={"95vw"}>
            {!isConnected && !rewardsAddress && <AddressSelector rewardsAddress={rewardsAddress} setRewardsAddress={setRewardsAddress} />}
            {(connectedWalletAddress || rewardsAddress) && (
                <CurrentAddressInfo rewardsAddress={rewardsAddress} setRewardsAddress={setRewardsAddress} />
            )}
            {(rewardsAddress || connectedWalletAddress) && (
                <RewardProgramTabs address={rewardsAddress || connectedWalletAddress} resetRewardsAddress={setRewardsAddress} />
            )}
        </VStack>
    )
}
