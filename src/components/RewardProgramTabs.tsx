import { useState } from "react"
import { VStack, HStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Image } from "@chakra-ui/react"

import IncentivesMainnetTab from "./IncentivesMainnetTab"

export default function RewardsContainer({ address, customRpc }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const handleTabChange = (index) => {
        setActiveTabIndex(index)
    }

    return (
        <VStack gap={6} width="100%">
            <Tabs isFitted width="100%" variant={"RewardsTabs"} onChange={handleTabChange}>
                <TabList borderColor={"transparent"} mb={0}>
                    <Tab py={2} fontWeight={"semibold"} fontSize={"lg"} gap={3}>
                        <HStack mb={activeTabIndex == 0 ? "4px" : "0"} mr={activeTabIndex == 0 ? "4px" : "0"}>
                            <Image maxW={4} objectFit={"cover"} src={"./images/SSVLogo.svg"} alt={"SSV Logo"} />
                            <Text>SSV Mainnet Incentives</Text>
                        </HStack>
                    </Tab>
                    <Tab py={2} fontWeight={"semibold"} fontSize={"lg"} gap={3}>
                        <HStack mb={activeTabIndex == 1 ? "4px" : "0"} ml={activeTabIndex == 1 ? "4px" : "0"}>
                            <Image maxW={6} borderRadius={"full"} objectFit={"cover"} src={"./images/LidoLogo.png"} alt={"Lido Logo"} />
                            <Text>Lido Vault</Text>
                        </HStack>
                    </Tab>
                </TabList>
                <TabPanels className="contentContainer" border={"2px solid"} borderTop={"none"} borderBottomRadius={"20px"}>
                    <TabPanel>
                        <IncentivesMainnetTab address={address} customRpc={customRpc} rewardsType={"mainnetIncentives"} />
                    </TabPanel>
                    <TabPanel>
                        <IncentivesMainnetTab address={address} customRpc={customRpc} rewardsType={"lidoIncentives"} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    )
}
