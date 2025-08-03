import { useEffect, useState } from "react"
import { VStack } from "@chakra-ui/react"

import RewardProgramTabs from "./RewardProgramTabs"
import AddressSelector from "./AddressSelector"
import CurrentAddressInfo from "./CurrentAddressInfo"

import { useAccount } from "wagmi"

export default function RewardsContainer({ customRpc }) {
    const [rewardsAddress, setRewardsAddress] = useState(null)
    const [useAlternativeAddress, setUseAlternativeAddress] = useState(false)

    const { address: connectedWalletAddress, isConnected } = useAccount()

    // On page load, if there is a url param called "address", set the rewardsAddress to that address
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const address = urlParams.get("address")
        if (address) {
            setRewardsAddress(address)
        }
    }, [])

    // UseEffect - When isConnected changes:
    //  - If there is a rewardsAddress (from a read-only address) then useAlternativeAddress should be true
    useEffect(() => {
        if (isConnected && rewardsAddress && rewardsAddress.toLowerCase() !== connectedWalletAddress.toLowerCase()) {
            setUseAlternativeAddress(true)
        }
    }, [isConnected, connectedWalletAddress, rewardsAddress])

    return (
        <VStack gap={10} className={"pageWidth"}>
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
                <RewardProgramTabs address={rewardsAddress || connectedWalletAddress} customRpc={customRpc} />
            )}
        </VStack>
    )
}
