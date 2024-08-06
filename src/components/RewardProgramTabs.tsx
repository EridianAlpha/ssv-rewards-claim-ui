import { useState } from "react"
import { Box, VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"

export default function RewardsContainer() {
    return (
        <VStack gap={6} width="100%">
            <Tabs isFitted width="100%" variant={"RewardsTabs"}>
                <TabList borderColor={"transparent"} mb={0}>
                    <Tab p={0} fontWeight={"bold"}>
                        Mainnet Incentives
                    </Tab>
                    <Tab fontWeight={"bold"}>Lido Vault (Coming soon…)</Tab>
                </TabList>
                <TabPanels className="contentContainer" border={"2px solid"} borderTop={"none"} borderBottomRadius={"20px"}>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    )
}
