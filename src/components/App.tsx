import { useEffect, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"

import { Box, Flex, useColorModeValue } from "@chakra-ui/react"

import RewardsContainer from "./RewardsContainer"
import CustomRpcInput from "./CustomRpcInput"

import "@rainbow-me/rainbowkit/styles.css"

import { getDefaultConfig, darkTheme, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { http, createConfig, WagmiProvider } from "wagmi"
import { mainnet as wagmiMainnet } from "wagmi/chains"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const App = () => {
    const colorMode = useColorModeValue("light", "dark")

    const [useCustomRpc, setUseCustomRpc] = useState(false)
    const [customRpc, setCustomRpc] = useState("")

    // Helper function to create default config
    const createDefaultConfig = (rpcUrl) => {
        const chainsConfig = {
            ...wagmiMainnet,
            rpcUrls: {
                default: {
                    http: [rpcUrl], // Set the default rpcUrl for mainnet
                },
            },
        }

        if (!process.env.NEXT_PUBLIC_WALLETCONNECT_ID) {
            // If no WalletConnect ID is set, only use the default injected provider
            return createConfig({
                chains: [chainsConfig],
                transports: {
                    [wagmiMainnet.id]: http(rpcUrl),
                },
            })
        } else {
            // If WalletConnect ID is set, use the default config with WalletConnect
            return getDefaultConfig({
                appName: "SSV Rewards Claim UI",
                projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
                chains: [chainsConfig],
                ssr: true,
            })
        }
    }

    // Create default rpcUrl config
    const [config, setConfig] = useState(createDefaultConfig(process.env.NEXT_PUBLIC_JSON_RPC))

    // UseEffect - Update default rpcUrl when customRpc changes
    useEffect(() => {
        setConfig(createDefaultConfig(customRpc || process.env.NEXT_PUBLIC_JSON_RPC))
    }, [customRpc])

    // UseEffect - Reset customRpc when useCustomRpc is false
    useEffect(() => {
        !useCustomRpc && setCustomRpc("")
    }, [useCustomRpc, setCustomRpc])

    // Create queryClient for RainbowKit
    const queryClient = new QueryClient()

    return (
        <Box minH="100vh" className={"bgPage"} display="flex" flexDirection="column">
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header useCustomRpc={useCustomRpc} setUseCustomRpc={setUseCustomRpc} />
                {useCustomRpc && <CustomRpcInput setUseCustomRpc={setUseCustomRpc} customRpc={customRpc} setCustomRpc={setCustomRpc} />}
                <Flex direction={"column"} alignItems={"center"} maxW={"100vw"} px={{ base: "0px", sm: "2vw", xl: "3vw", "2xl": "3vw" }}>
                    <Box height={"30px"} />
                    <WagmiProvider config={config}>
                        <QueryClientProvider client={queryClient}>
                            <RainbowKitProvider modalSize="compact" theme={colorMode === "dark" ? darkTheme() : lightTheme()}>
                                <RewardsContainer customRpc={customRpc} />
                            </RainbowKitProvider>
                        </QueryClientProvider>
                    </WagmiProvider>
                    <Box height={30} />
                </Flex>
            </Flex>
            <Box flex="1" />
            <Footer />
        </Box>
    )
}

export default App
