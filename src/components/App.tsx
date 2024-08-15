import { useEffect, useState } from "react"
import { Box, Flex, useColorModeValue } from "@chakra-ui/react"

import Header from "./Header"
import Footer from "./Footer"
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
    const [isValidWalletConnectId, setIsValidWalletConnectId] = useState(false)

    // Helper function to create default config
    const createDefaultConfig = (rpcUrl) => {
        // Set default RPC for mainnet
        const commonChainsConfig = {
            ...wagmiMainnet,
            rpcUrls: {
                default: {
                    http: [rpcUrl], // Set the default rpcUrl for mainnet
                },
            },
        }

        const fallbackConfig = createConfig({
            chains: [commonChainsConfig],
            transports: {
                [wagmiMainnet.id]: http(rpcUrl),
            },
        })

        if (process.env.NEXT_PUBLIC_WALLETCONNECT_ID) {
            // If WalletConnect ID exists check if it is valid,
            if (isValidWalletConnectId) {
                // If it is valid, use the default config with WalletConnect
                // Note: Can only be created after confirming WalletConnectId
                // exists and is valid or else it will throw an error
                return getDefaultConfig({
                    appName: "SSV Rewards Claim UI",
                    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
                    chains: [commonChainsConfig],
                    ssr: true,
                })
            } else {
                // If it is not valid, use the fallback config
                return fallbackConfig
            }
        } else {
            // If no WalletConnect ID exists, use the fallback config
            return fallbackConfig
        }
    }

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_WALLETCONNECT_ID) {
            fetch(`https://explorer-api.walletconnect.com/v3/wallets?projectId=${process.env.NEXT_PUBLIC_WALLETCONNECT_ID}`)
                .then((response) => {
                    if (response.ok) {
                        console.log("WalletConnect ID is valid")
                        setIsValidWalletConnectId(true)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching WalletConnect ID", error)
                    setIsValidWalletConnectId(false)
                })
        }
    }, [])

    useEffect(() => {
        isValidWalletConnectId && setConfig(createDefaultConfig(customRpc || process.env.NEXT_PUBLIC_JSON_RPC))
    }, [isValidWalletConnectId])

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
