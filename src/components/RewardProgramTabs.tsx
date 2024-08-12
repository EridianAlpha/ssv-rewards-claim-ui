import { useState } from "react"
import { VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Spinner } from "@chakra-ui/react"

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
                    <Tab py={2} fontWeight={"semibold"} fontSize={"lg"}>
                        <Text mb={activeTabIndex == 0 ? "4px" : "0"} mr={activeTabIndex == 0 ? "4px" : "0"}>
                            Mainnet Incentives
                        </Text>
                    </Tab>
                    <Tab py={2} fontWeight={"semibold"} fontSize={"lg"}>
                        <Text mb={activeTabIndex == 1 ? "4px" : "0"} ml={activeTabIndex == 1 ? "4px" : "0"}>
                            Lido Vault (Coming soon…)
                        </Text>
                    </Tab>
                </TabList>
                <TabPanels className="contentContainer" border={"2px solid"} borderTop={"none"} borderBottomRadius={"20px"}>
                    <TabPanel>
                        <IncentivesMainnetTab address={address} customRpc={customRpc} />
                    </TabPanel>
                    <TabPanel>
                        <Text minH={"400px"} pt={10} textAlign={"center"} fontWeight={"semibold"}>
                            🏗️ Coming soon! 🏗️
                        </Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    )
}
