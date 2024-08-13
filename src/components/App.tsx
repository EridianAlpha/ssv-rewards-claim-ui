import { useEffect, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"

import { Box, Flex, useColorModeValue } from "@chakra-ui/react"

import RewardsContainer from "./RewardsContainer"

import "@rainbow-me/rainbowkit/styles.css"

import { getDefaultConfig, darkTheme, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { mainnet as wagmiMainnet } from "wagmi/chains"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const config = getDefaultConfig({
    appName: "SSV Rewards Claim",
    projectId: "87f79383c4e3bdba4a2117cdc8393a12",
    chains: [
        {
            ...wagmiMainnet,
            rpcUrls: {
                default: {
                    http: [process.env.NEXT_PUBLIC_JSON_RPC], // Set the default rpcUrl for mainnet
                },
            },
        },
    ],
    ssr: true,
})

const App = () => {
    // Create queryClient for RainbowKit
    const queryClient = new QueryClient()

    const colorMode = useColorModeValue("light", "dark")

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider modalSize="compact" theme={colorMode == "dark" ? darkTheme() : lightTheme()}>
                    <Box minH="100vh" className={"bgPage"} display="flex" flexDirection="column">
                        <Flex direction="column" justifyContent="center" alignItems="center">
                            <Header />
                            <Flex direction={"column"} alignItems={"center"} maxW={"100vw"} px={{ base: "0px", sm: "2vw", xl: "3vw", "2xl": "3vw" }}>
                                <Box height={"30px"} />
                                <RewardsContainer />
                                <Box height={30} />
                            </Flex>
                        </Flex>
                        <Box flex="1" />
                        <Footer />
                    </Box>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default App
