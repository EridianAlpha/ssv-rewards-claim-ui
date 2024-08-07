import { useState } from "react"
import { VStack, Text } from "@chakra-ui/react"

import RewardProgramTabs from "./RewardProgramTabs"
import AddressSelector from "./AddressSelector"
import CurrentAddressInfo from "./CurrentAddressInfo"

import { useAccount, useDisconnect } from "wagmi"

export default function RewardsContainer() {
    const [readOnlyAddress, setReadOnlyAddress] = useState(null)

    const { address: connectedWalletAddress, isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    return (
        <VStack gap={10} w={"600px"} maxW={"95vw"}>
            {!readOnlyAddress && !isConnected && <AddressSelector setReadOnlyAddress={setReadOnlyAddress} />}
            {readOnlyAddress && (
                <CurrentAddressInfo currentAddress={readOnlyAddress} addressType={"readOnlyAddress"} resetAddress={setReadOnlyAddress} />
            )}
            {connectedWalletAddress && (
                <CurrentAddressInfo currentAddress={connectedWalletAddress} addressType={"connectedWallet"} resetAddress={disconnect} />
            )}
            {(readOnlyAddress || connectedWalletAddress) && (
                <RewardProgramTabs address={readOnlyAddress || connectedWalletAddress} resetReadOnlyAddress={setReadOnlyAddress} />
            )}
        </VStack>
    )
}
