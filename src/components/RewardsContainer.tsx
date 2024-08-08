import { useEffect, useState } from "react"
import { VStack, Text } from "@chakra-ui/react"

import RewardProgramTabs from "./RewardProgramTabs"
import AddressSelector from "./AddressSelector"
import CurrentAddressInfo from "./CurrentAddressInfo"

import { useAccount } from "wagmi"

export default function RewardsContainer() {
    const [rewardsAddress, setRewardsAddress] = useState(null)
    const [useAlternativeAddress, setUseAlternativeAddress] = useState(rewardsAddress ? true : false)

    const { address: connectedWalletAddress, isConnected } = useAccount()

    // UseEffect - When isConnected changes:
    //  - If there's a rewardsAddress (from a read-only address) then useAlternativeAddress should be true
    //  - Unless the rewardsAddress is the same as the connectedWalletAddress
    //      - In which case useAlternativeAddress should be false and the rewardsAddress should be reset
    useEffect(() => {
        if (isConnected && rewardsAddress) {
            if (rewardsAddress !== connectedWalletAddress) {
                setUseAlternativeAddress(true)
            } else {
                setUseAlternativeAddress(false)
                setRewardsAddress(null)
            }
        }
    }, [isConnected])

    return (
        <VStack gap={10} w={"600px"} maxW={"95vw"}>
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
