import { useEffect } from "react"

export default function useFetchLatestFile(type, address, merkleProof, setMerkleProofEntry, setPreviouslyClaimedRewards) {
    useEffect(() => {
        if (address && merkleProof) {
            merkleProof.data.map(async (entry) => {
                if (entry.address == address) {
                    setMerkleProofEntry(entry)
                    const fetchPreviouslyClaimedRewardsResponse = await fetch(`/api/fetchPreviouslyClaimedRewards/?type=${type}&address=${address}`)
                    const responseJson = await fetchPreviouslyClaimedRewardsResponse.json()
                    setPreviouslyClaimedRewards(responseJson.cumulativeClaimed)
                }
            })
        }
    }, [address, merkleProof])
}
