import { ethers } from "ethers"
import { contracts } from "public/data/contracts"

/**
 * Fetches the cumulative claimed amount for a specific address and type using the given RPC URL.
 *
 * @param {string} type - The type of the cumulativeMerkleDrop contract.
 * @param {string} address - The address to check for cumulative claimed rewards.
 * @param {string} rpcUrl - The RPC URL to connect to the Ethereum provider.
 * @returns {Promise<string>} - The cumulative claimed amount as a string.
 * @throws {Error} - If the RPC URL is invalid or the node is not available.
 */
export async function fetchCumulativeClaimed(type: string, address: string, rpcUrl: string): Promise<string> {
    const provider = new ethers.JsonRpcProvider(rpcUrl)

    // Validate the provider by attempting to get the network
    try {
        await provider.getNetwork()
    } catch (networkError) {
        console.error("Invalid RPC URL:", rpcUrl)
        throw new Error("Invalid RPC URL or the node is not available.")
    }

    const cumulativeMerkleDropAddress = contracts.cumulativeMerkleDrop[type]

    const cumulativeMerkleDropAbi = ["function cumulativeClaimed(address) view returns (uint256)"]
    const cumulativeMerkleDropContract = new ethers.Contract(cumulativeMerkleDropAddress.toString(), cumulativeMerkleDropAbi, provider)

    const cumulativeClaimed = await cumulativeMerkleDropContract.cumulativeClaimed(address)

    return cumulativeClaimed.toString()
}
