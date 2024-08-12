import { ethers } from "ethers"
import { contracts } from "public/data/contracts"

export default async function handler(req, res) {
    try {
        const { type, address, customRpc } = req.query

        const provider = new ethers.JsonRpcProvider(customRpc || process.env.NEXT_PUBLIC_JSON_RPC)

        // Validate the provider by attempting to get the network
        try {
            await provider.getNetwork()
        } catch (networkError) {
            console.error("Invalid RPC URL:", customRpc || process.env.NEXT_PUBLIC_JSON_RPC)
            return res.status(400).json({ error: "Invalid RPC URL or the node is not available." })
        }

        const cumulativeMerkleDropAddress = contracts.cumulativeMerkleDrop[type]

        const cumulativeMerkleDropAbi = ["function cumulativeClaimed(address) view returns (uint256)"]
        const cumulativeMerkleDropContract = new ethers.Contract(cumulativeMerkleDropAddress.toString(), cumulativeMerkleDropAbi, provider)

        const cumulativeClaimed = await cumulativeMerkleDropContract.cumulativeClaimed(address)

        return res.status(200).json({ cumulativeClaimed: cumulativeClaimed.toString() })
    } catch (error) {
        console.error("Error in handler:", error)
        return res.status(500).json({ error: "Failed to fetch cumulative claimed rewards. Please try again later." })
    }
}
