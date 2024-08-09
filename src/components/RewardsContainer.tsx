import { useEffect, useState } from "react"
import { VStack } from "@chakra-ui/react"

import RewardProgramTabs from "./RewardProgramTabs"
import AddressSelector from "./AddressSelector"
import CurrentAddressInfo from "./CurrentAddressInfo"

import { useAccount } from "wagmi"

export default function RewardsContainer() {
    const [rewardsAddress, setRewardsAddress] = useState(null)
    const [useAlternativeAddress, setUseAlternativeAddress] = useState(false)

    const { address: connectedWalletAddress, isConnected } = useAccount()

    // UseEffect - When isConnected changes:
    //  - If there is a rewardsAddress (from a read-only address) then useAlternativeAddress should be true
    useEffect(() => {
        if (isConnected && rewardsAddress && rewardsAddress.toLowerCase() !== connectedWalletAddress.toLowerCase()) {
            setUseAlternativeAddress(true)
        }
    }, [isConnected, connectedWalletAddress, rewardsAddress])

    return (
        <VStack gap={10} w={"620px"} maxW={"95vw"}>
            {!isConnected && !rewardsAddress && <AddressSelector rewardsAddress={rewardsAddress} setRewardsAddress={setRewardsAddress} />}
            {(connectedWalletAddress || rewardsAddress) && (
                <CurrentAddressInfo
                    rewardsAddress={rewardsAddress}
                    setRewardsAddress={setRewardsAddress}
                    useAlternativeAddress={useAlternativeAddress}
                    setUseAlternativeAddress={setUseAlternativeAddress}
                />
            )}
            {(rewardsAddress || (connectedWalletAddress && !useAlternativeAddress)) && (
                <RewardProgramTabs address={rewardsAddress || connectedWalletAddress} />
            )}
        </VStack>
    )
}
