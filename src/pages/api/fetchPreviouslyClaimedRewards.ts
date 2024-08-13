import { fetchCumulativeClaimed } from "src/utils/fetchCumulativeClaimed"

export default async function handler(req, res) {
    try {
        const { type, address, customRpc } = req.query
        const rpcUrl = customRpc || process.env.NEXT_PUBLIC_JSON_RPC

        try {
            const cumulativeClaimed = await fetchCumulativeClaimed(type, address, rpcUrl)
            return res.status(200).json({ cumulativeClaimed })
        } catch (error) {
            console.error("Error in handler:", error)
            return res.status(400).json({ error: error.message })
        }
    } catch (error) {
        console.error("Error in handler:", error)
        return res.status(500).json({ error: "Failed to fetch cumulative claimed rewards. Please try again later." })
    }
}
