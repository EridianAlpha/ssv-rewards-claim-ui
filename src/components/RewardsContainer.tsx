import { useState } from "react"
import { Box, VStack, Text, Button, Input } from "@chakra-ui/react"

import RewardProgramTabs from "./RewardProgramTabs"
import AddressSelector from "./AddressSelector"
import CurrentAddressInfo from "./CurrentAddressInfo"

export default function RewardsContainer() {
    const [readOnlyAddress, setReadOnlyAddress] = useState(null)

    return (
        <VStack gap={!readOnlyAddress ? 10 : 16} w={"600px"} maxW={"95vw"}>
            {!readOnlyAddress && <AddressSelector setReadOnlyAddress={setReadOnlyAddress} />}
            {readOnlyAddress && (
                <CurrentAddressInfo currentAddress={readOnlyAddress} addressType={"readOnlyAddress"} resetAddress={setReadOnlyAddress} />
            )}
            {/* {connectedWallet && <CurrentAddressInfo currentAddress={connectedWallet.address} addressType={"connectedWallet"} />} */}
            {readOnlyAddress && <RewardProgramTabs />}
        </VStack>
    )
}
