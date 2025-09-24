import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/api/list-files")) {
        const ua = req.headers.get("user-agent") || ""

        // Block python-requests scraper
        if (ua.toLowerCase().includes("python-requests")) {
            return new NextResponse("Blocked", { status: 403 })
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/api/list-files"],
}
