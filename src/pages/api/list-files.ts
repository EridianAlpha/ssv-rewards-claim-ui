// pages/api/list-files.js
import fs from "fs"
import path from "path"

export default function handler(req, res) {
    try {
        const dataDirectory = path.join(process.cwd(), "public", "data", req.query.directory)
        const files = fs.readdirSync(dataDirectory)
        const jsonFiles = files.filter((file) => file.startsWith("MerkleProof-") && file.endsWith(".json"))

        res.status(200).json(jsonFiles)
    } catch (err) {
        console.error("❌ Error reading directory:", err)
        res.status(500).json({ error: "Internal server error" })
    }
}
