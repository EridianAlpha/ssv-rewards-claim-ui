import { useEffect, useState } from "react"
import { VStack, HStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Image, useColorModeValue } from "@chakra-ui/react"

import { REWARDS_SHELL_BORDER } from "../styles/customTheme"

import IncentivesMainnetTab from "./IncentivesMainnetTab"

export default function RewardsContainer({ address, customRpc }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const shellBorderColor = useColorModeValue(REWARDS_SHELL_BORDER.light, REWARDS_SHELL_BORDER.dark)

    // On page load, if there is a url param called "tab", set the activeTabIndex to that tab
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const tab = urlParams.get("tab")
        if (tab) {
            if (tab === "lido") setActiveTabIndex(2)
            else if (tab === "mainnetIncentivesEthCluster" || tab === "eth-cluster") setActiveTabIndex(1)
            else setActiveTabIndex(0)
        }
    }, [address])

    const handleTabChange = (index) => {
        setActiveTabIndex(index)
    }

    return (
        <VStack gap={6} width="100%">
            <Tabs isFitted width="100%" variant={"RewardsTabs"} index={activeTabIndex} onChange={handleTabChange}>
                <TabList borderColor={"transparent"} mb={0}>
                    <Tab py={2} fontWeight={"semibold"} fontSize={"lg"} gap={3}>
                        <HStack justifyContent="center" alignItems="center" spacing={3} minH="32px">
                            <Image maxW={4} objectFit={"cover"} src={"./images/SSVLogo.svg"} alt={"SSV Logo"} />
                            <Text>Incentivized Mainnet <br/> (SSV - Legacy)</Text>
                        </HStack>
                    </Tab>
                    <Tab py={2} fontWeight={"semibold"} fontSize={"lg"} gap={3}>
                        <HStack justifyContent="center" alignItems="center" spacing={3} minH="32px">
                            <Image maxW={4} objectFit={"cover"} src={"./images/SSVLogo.svg"} alt={"SSV Logo"} />
                            <Text>Incentivized Mainnet <br/> (ETH Cluster)</Text>
                        </HStack>
                    </Tab>
                    <Tab py={2} fontWeight={"semibold"} fontSize={"lg"} gap={3}>
                        <HStack justifyContent="center" alignItems="center" spacing={3} minH="32px">
                            <Image maxW={6} borderRadius={"full"} objectFit={"cover"} src={"./images/LidoLogo.png"} alt={"Lido Logo"} />
                            <Text>Lido SDVT / CSM / DVV</Text>
                        </HStack>
                    </Tab>
                </TabList>
                <TabPanels
                    className="contentContainer"
                    border="2px solid"
                    borderColor={shellBorderColor}
                    borderTop="none"
                    borderBottomRadius="20px"
                >
                    <TabPanel>
                        <IncentivesMainnetTab address={address} customRpc={customRpc} rewardsType={"mainnetIncentives"} />
                    </TabPanel>
                    <TabPanel>
                        <IncentivesMainnetTab address={address} customRpc={customRpc} rewardsType={"mainnetIncentivesEthCluster"} />
                    </TabPanel>
                    <TabPanel>
                        <IncentivesMainnetTab address={address} customRpc={customRpc} rewardsType={"lidoIncentives"} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    )
}
