import { useEffect, useState } from "react"
import { fetchCumulativeClaimed } from "src/utils/fetchCumulativeClaimed"

export default function useFetchPreviouslyClaimedRewards(
    type,
    address,
    merkleProof,
    setMerkleProofEntry,
    setPreviouslyClaimedRewards,
    setIsLoading,
    isTransactionConfirmed,
    customRpc
) {
    const [fetchResult, setFetchResult] = useState(null)

    useEffect(() => {
        let addressFoundInMerkleProof = false

        // Reset values before fetching new data
        setIsLoading(true)
        setMerkleProofEntry(null)
        setPreviouslyClaimedRewards(null)
        setFetchResult(null)

        if (address && merkleProof) {
            const fetchRequests = merkleProof.data.map(async (entry) => {
                if (entry.address.toLowerCase() === address.toLowerCase()) {
                    try {
                        setMerkleProofEntry(entry)
                        addressFoundInMerkleProof = true

                        if (customRpc) {
                            try {
                                const cumulativeClaimed = await fetchCumulativeClaimed(type, address, customRpc)
                                setPreviouslyClaimedRewards(cumulativeClaimed)
                                setFetchResult({ success: true, data: { cumulativeClaimed } })
                            } catch (error) {
                                console.error("Error fetching previously claimed rewards:", error)
                                setFetchResult({ success: false, error: error.message })
                            }
                        } else {
                            const fetchPreviouslyClaimedRewardsResponse = await fetch(
                                `/api/fetchPreviouslyClaimedRewards/?type=${type}&address=${address}`
                            )
                            if (!fetchPreviouslyClaimedRewardsResponse.ok) {
                                throw new Error(`Error: ${fetchPreviouslyClaimedRewardsResponse.statusText}`)
                            }
                            const responseJson = await fetchPreviouslyClaimedRewardsResponse.json()
                            setPreviouslyClaimedRewards(responseJson.cumulativeClaimed)
                            setFetchResult({ success: true, data: responseJson })
                        }
                    } catch (error) {
                        console.error("Error fetching previously claimed rewards:", error)
                        setFetchResult({ success: false, error: error.message })
                        setIsLoading(false)
                    }
                }
            })

            Promise.all(fetchRequests)
                .then(() => {
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error("Error processing fetch requests:", error)
                    setFetchResult({ success: false, error: error.message })
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [address, merkleProof, setMerkleProofEntry, setPreviouslyClaimedRewards, setIsLoading, type, isTransactionConfirmed, customRpc])

    return fetchResult
}
