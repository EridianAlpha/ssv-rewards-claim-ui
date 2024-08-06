import { useState } from "react"
import { Box, VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"

export default function RewardsContainer() {
    return (
        <VStack gap={6}>
            <Tabs isFitted variant="enclosed-colored">
                <TabList>
                    <Tab>One</Tab>
                    <Tab>Two</Tab>
                </TabList>
                <TabPanels>
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
