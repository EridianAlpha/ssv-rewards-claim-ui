import { useState } from "react"
import Header from "./Header/Header"
import Footer from "./Footer"

import { Box, Flex, Text, Image, Button } from "@chakra-ui/react"

const App = () => {
    return (
        <Box minH="100vh" className={"bgPage"} display="flex" flexDirection="column">
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header />
                <Flex direction={"column"} alignItems={"center"} maxW={"100vw"} w={"1150px"} px={{ base: "0px", sm: "2vw", xl: "3vw", "2xl": "3vw" }}>
                    <Box height={30} />
                    <Text fontWeight={"extrabold"} fontSize={"3xl"} textAlign={"center"}>
                        SSV
                    </Text>
                    <Image src={"./images/EthLogo.svg"} alt={"Cover Image"} objectFit="contain" boxSize={"200px"} borderRadius={"100%"} my={4} />
                    <Text fontWeight={"bold"} fontSize={"1xl"} pt={2} px={5} textAlign={"center"}>
                        Let&apos;s start building something awesome!
                    </Text>
                    <Box height={50} />
                </Flex>
            </Flex>
            <Box flex="1" />
            <Footer />
        </Box>
    )
}

export default App
