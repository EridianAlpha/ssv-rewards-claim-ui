import { ethers } from "ethers"
import { contracts } from "public/data/contracts"

export default async function handler(req, res) {
    try {
        const { type, address } = req.query

        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC)

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
