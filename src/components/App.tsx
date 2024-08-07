import { useState } from "react"
import Header from "./Header"
import Footer from "./Footer"

import { Box, Flex, Text, Image, Button } from "@chakra-ui/react"

import RewardsContainer from "./RewardsContainer"

const App = () => {
    return (
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
    )
}

export default App
