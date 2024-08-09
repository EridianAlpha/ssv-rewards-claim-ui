import fs from "fs"
import path from "path"
import { ethers } from "ethers"

export default async function handler(req, res) {
    try {
        const { type, address } = req.query

        const provider = new ethers.JsonRpcProvider(process.env.JSON_RPC_URL)

        const filePath = path.join(process.cwd(), "public", "data", type, "CumulativeMerkleDropAddress")
        const contractAddress = fs.readFileSync(filePath, "utf-8")

        const cumulativeMerkleDropAbi = ["function cumulativeClaimed(address) view returns (uint256)"]
        const cumulativeMerkleDropContract = new ethers.Contract(contractAddress.toString(), cumulativeMerkleDropAbi, provider)

        const cumulativeClaimed = await cumulativeMerkleDropContract.cumulativeClaimed(address)

        return res.status(200).json({ cumulativeClaimed: cumulativeClaimed.toString() })
    } catch (error) {
        console.error("Error in handler:", error)
        return res.status(500).json({ error: "Failed to fetch cumulative claimed rewards. Please try again later." })
    }
}
