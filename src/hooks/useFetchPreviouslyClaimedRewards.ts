import { useEffect } from "react"

export default function useFetchLatestFile(
    type,
    address,
    merkleProof,
    setMerkleProofEntry,
    setPreviouslyClaimedRewards,
    setIsLoading,
    isTransactionConfirmed
) {
    useEffect(() => {
        let addressFoundInMerkleProof = false

        // Reset values before fetching new data
        setIsLoading(true)
        setMerkleProofEntry(null)
        setPreviouslyClaimedRewards(null)

        if (address && merkleProof) {
            const fetchRequests = merkleProof.data.map(async (entry) => {
                if (entry.address == address) {
                    setMerkleProofEntry(entry)
                    const fetchPreviouslyClaimedRewardsResponse = await fetch(`/api/fetchPreviouslyClaimedRewards/?type=${type}&address=${address}`)
                    const responseJson = await fetchPreviouslyClaimedRewardsResponse.json()
                    setPreviouslyClaimedRewards(responseJson.cumulativeClaimed)
                    addressFoundInMerkleProof = true
                }
            })

            Promise.all(fetchRequests).then(() => {
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [address, merkleProof, setMerkleProofEntry, setPreviouslyClaimedRewards, setIsLoading, type, isTransactionConfirmed])
}
