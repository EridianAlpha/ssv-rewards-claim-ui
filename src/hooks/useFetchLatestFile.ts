import { useEffect } from "react"

import fetchLatestMerkleProof from "../utils/fetchLatestMerkleProof"

export default function useFetchLatestFile(setMerkleProof, setMerkleProofDate, type) {
    useEffect(() => {
        const fetchLatestFile = async () => {
            const { latestFileData, latestFileDate } = await fetchLatestMerkleProof(type)

            // Format the date
            const formattedDate = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(new Date(latestFileDate))

            setMerkleProof(latestFileData)
            setMerkleProofDate(formattedDate)
        }
        fetchLatestFile()
    }, [])
}
