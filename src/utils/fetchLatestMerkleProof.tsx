export default async function fetchLatestMerkleProof(directory) {
    const response = await fetch(`/api/list-files?directory=${directory}`)
    const files = await response.json()

    files.sort((a, b) => {
        const dateA: any = new Date(a.replace("MerkleProof-", "").replace(".json", ""))
        const dateB: any = new Date(b.replace("MerkleProof-", "").replace(".json", ""))
        return dateB - dateA
    })

    const latestFile = files[0]
    const latestFileResponse = await fetch(`/data/${directory}/${latestFile}`)
    const latestFileData = await latestFileResponse.json()
    const latestFileDate = new Date(latestFile.replace("MerkleProof-", "").replace(".json", ""))

    return { latestFileData, latestFileDate }
}
