import { useEffect } from "react"

export default function useFetchLatestFile(type, address, merkleProof, setMerkleProofEntry, setPreviouslyClaimedRewards, setIsLoading) {
    useEffect(() => {
        let addressFoundInMerkleProof = false

        if (address && merkleProof) {
            merkleProof.data.map(async (entry) => {
                if (entry.address == address) {
                    setMerkleProofEntry(entry)
                    const fetchPreviouslyClaimedRewardsResponse = await fetch(`/api/fetchPreviouslyClaimedRewards/?type=${type}&address=${address}`)
                    const responseJson = await fetchPreviouslyClaimedRewardsResponse.json()
                    setPreviouslyClaimedRewards(responseJson.cumulativeClaimed)
                    setIsLoading(false)
                    addressFoundInMerkleProof = true
                }
            })
        }
        if (!addressFoundInMerkleProof) {
            setIsLoading(false)
        }
    }, [address, merkleProof, setMerkleProofEntry, setPreviouslyClaimedRewards, setIsLoading, type])
}
