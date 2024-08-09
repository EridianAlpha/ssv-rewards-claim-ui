import { Html, Head, Main, NextScript } from "next/document"
import { ColorModeScript } from "@chakra-ui/react"

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>SSV Rewards</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <ColorModeScript initialColorMode="dark" />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
