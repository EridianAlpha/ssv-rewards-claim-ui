import { useState, useEffect } from "react"
import { VStack, HStack, Text, Spinner } from "@chakra-ui/react"

import useFetchLatestFile from "@/hooks/useFetchLatestFile"
import useFetchPreviouslyClaimedRewards from "@/hooks/useFetchPreviouslyClaimedRewards"

export default function IncentivesMainnetTab({ address }) {
    const [merkleProof, setMerkleProof] = useState(null)
    const [merkleProofDate, setMerkleProofDate] = useState(null)
    const [merkleProofEntry, setMerkleProofEntry] = useState(null)
    const [previouslyClaimedRewards, setPreviouslyClaimedRewards] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [minimumDelayLoading, setMinimumDelayLoading] = useState(true)

    // UseEffect - Fetch the latest Merkle Proof file
    useFetchLatestFile(setMerkleProof, setMerkleProofDate, "mainnetIncentives")

    // UseEffect - When `address` has a value, check to see if it is in the Merkle Proof and get previously claimed rewards
    useFetchPreviouslyClaimedRewards("mainnetIncentives", address, merkleProof, setMerkleProofEntry, setPreviouslyClaimedRewards, setIsLoading)

    // Add a minimum delay to the loading spinner so that it doesn't flash too quickly to see
    useEffect(() => {
        setTimeout(() => {
            setMinimumDelayLoading(false)
        }, 1000)
    }, [])

    if (minimumDelayLoading || isLoading) {
        return (
            <HStack justifyContent={"center"} minH={"400px"}>
                <Spinner />
                <Text>Loading...</Text>
            </HStack>
        )
    }

    return (
        <VStack gap={6} width="100%" p={5}>
            <Text>Latest Results Calculation: {merkleProofDate}</Text>
            <Text>Total rewards from proof: {formatSSVAmount(merkleProofEntry?.amount)} SSV</Text>
            <Text>Previously claimed rewards: {formatSSVAmount(previouslyClaimedRewards)} SSV</Text>
            <Text>Unclaimed rewards: {formatSSVAmount(merkleProofEntry?.amount - previouslyClaimedRewards)}</Text>
            {(!merkleProofEntry || merkleProofEntry?.amount - previouslyClaimedRewards == 0) && <Text>No rewards to claim right now.</Text>}
            <Text>View and interact with the rewards contract directly on Etherscan ↗</Text>
            {/* <Text>https://etherscan.io/address/0xe16d6138B1D2aD4fD6603ACdb329ad1A6cD26D9f</Text> */}
        </VStack>
    )
}

function formatSSVAmount(amount) {
    return (amount / 1e18).toFixed(4)
}
