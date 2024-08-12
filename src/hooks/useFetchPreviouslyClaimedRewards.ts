import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { contracts } from "public/data/contracts"

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
                        // If a customRpc is provided, use it to fetch the cumulative claimed rewards
                        if (customRpc) {
                            const provider = new ethers.JsonRpcProvider(customRpc)

                            // Validate the provider by attempting to get the network
                            try {
                                await provider.getNetwork()
                            } catch (networkError) {
                                console.error("Invalid RPC URL:", customRpc)
                                return setFetchResult({ success: false, error: "Invalid RPC URL or the node is not available." })
                            }

                            const cumulativeMerkleDropAddress = contracts.cumulativeMerkleDrop[type]

                            const cumulativeMerkleDropAbi = ["function cumulativeClaimed(address) view returns (uint256)"]
                            const cumulativeMerkleDropContract = new ethers.Contract(
                                cumulativeMerkleDropAddress.toString(),
                                cumulativeMerkleDropAbi,
                                provider
                            )

                            const cumulativeClaimed = await cumulativeMerkleDropContract.cumulativeClaimed(address)
                            setPreviouslyClaimedRewards(cumulativeClaimed.toString())
                            setFetchResult({ success: true, data: { cumulativeClaimed: cumulativeClaimed.toString() } })
                        } else {
                            // Used when there is no custom RPC provided (e.g. when viewing a read-only address)
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
