import { VStack, HStack, Text, Input, Button, Link } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import NextLink from "next/link"

export default function CustomRpcInput({ setUseCustomRpc, customRpc, setCustomRpc }) {
    const buttonSize = "27px"

    return (
        <VStack className={"pageWidth"} alignItems={"start"} mt={5} px={3} pt={2} pb={3} borderRadius={"20px"} bg={"orange"}>
            <HStack justifyContent={"space-between"} w={"100%"} px={1}>
                <Text fontSize={"lg"} fontWeight={"semibold"}>
                    Use a custom RPC (optional)
                </Text>
                <Button
                    variant={"HeaderButton"}
                    borderRadius={"full"}
                    p={0}
                    h={buttonSize}
                    w={buttonSize}
                    maxW={buttonSize}
                    minW={buttonSize}
                    onClick={() => {
                        setUseCustomRpc(false)
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} size={"lg"} />
                </Button>
            </HStack>
            <Text px={1}>
                If the default RPC{" "}
                <Link
                    className="bgPage"
                    py={"2px"}
                    px={"8px"}
                    borderRadius={"full"}
                    as={NextLink}
                    href={process.env.NEXT_PUBLIC_JSON_RPC}
                    color={"blue"}
                    textDecoration={"underline"}
                    target="_blank"
                >
                    {process.env.NEXT_PUBLIC_JSON_RPC} ↗
                </Link>{" "}
                is not working and/or you would prefer to use a different RPC provider to query Ethereum you can enter a custom RPC URL here.
            </Text>
            <Text px={1}>
                Alternative RPC providers{" "}
                <Link
                    className="bgPage"
                    py={"2px"}
                    px={"8px"}
                    borderRadius={"full"}
                    as={NextLink}
                    href={"https://ethereumnodes.com"}
                    color={"blue"}
                    textDecoration={"underline"}
                    target="_blank"
                >
                    https://ethereumnodes.com ↗
                </Link>
                .
            </Text>
            <Input
                placeholder="e.g. http://localhost:8545"
                p={5}
                w={"100%"}
                borderRadius={"20px"}
                fontFamily={"monospace"}
                value={customRpc}
                onChange={(event) => setCustomRpc(event.target.value)}
                border={"none"}
                variant={"AddressInput"}
            />
        </VStack>
    )
}
