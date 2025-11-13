function parseDateString(dateStr: string): Date {
    // Parse "YYYY-MM" format
    const [year, month] = dateStr.split("-").map(Number)
    // Month is 0-indexed in JavaScript Date, so subtract 1
    return new Date(year, month - 1, 1)
}

export default async function fetchLatestMerkleProof(directory) {
    const response = await fetch(`/api/list-files?directory=${directory}`)
    const files = await response.json()

    files.sort((a, b) => {
        const dateStrA = a.replace("MerkleProof-", "").replace(".json", "")
        const dateStrB = b.replace("MerkleProof-", "").replace(".json", "")
        const dateA = parseDateString(dateStrA)
        const dateB = parseDateString(dateStrB)
        return dateB.getTime() - dateA.getTime()
    })

    const latestFile = files[0]
    const latestFileResponse = await fetch(`/data/${directory}/${latestFile}`)
    const latestFileData = await latestFileResponse.json()
    const latestFileDateStr = latestFile.replace("MerkleProof-", "").replace(".json", "")
    const latestFileDate = parseDateString(latestFileDateStr)

    return { latestFileData, latestFileDate }
}
