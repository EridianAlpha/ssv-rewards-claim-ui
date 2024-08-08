import fs from "fs"
import path from "path"

import { ethers } from "ethers"

export default async function handler(req, res) {
    const { type, address } = req.query

    const provider = new ethers.JsonRpcProvider(process.env.JSON_RPC_URL)

    const filePath = path.join(process.cwd(), "public", "data", type, "CumulativeMerkleDropAddress")
    const contractAddress = fs.readFileSync(filePath, "utf-8")

    const cumulativeMerkleDropAbi = ["function cumulativeClaimed(address) view returns (uint256)"]
    const cumulativeMerkleDropContract = new ethers.Contract(contractAddress.toString(), cumulativeMerkleDropAbi, provider)

    const cumulativeClaimed = await cumulativeMerkleDropContract.cumulativeClaimed(address)

    return res.status(200).json({ cumulativeClaimed: cumulativeClaimed.toString() })
}
