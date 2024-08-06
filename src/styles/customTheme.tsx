import { extendTheme, Input } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/theme-tools"
import { color } from "framer-motion"
import { lighten, darken, borderRadius, border } from "polished"

function lightenColor(mainColor, value) {
    return lighten(value, mainColor)
}
function darkenColor(mainColor, value) {
    return darken(value, mainColor)
}

const customTheme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            ".bgPage": {
                bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
            },
        }),
    },
    components: {
        Code: {
            baseStyle: (props: StyleFunctionProps) => ({
                bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "contentBackground.light",
            }),
        },
        Drawer: {
            variants: {
                solid: (props) => ({
                    dialog: {
                        bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    },
                }),
            },
            defaultProps: {
                variant: "solid",
            },
        },
        Input: {
            variants: {
                AddressInput: (props: StyleFunctionProps) => ({
                    field: {
                        bg:
                            props.colorMode === "dark"
                                ? lightenColor(props.theme.colors.pageBackground.dark, 0.1)
                                : darkenColor(props.theme.colors.contentBackground.light, 0.1),
                        _focus: {
                            bg:
                                props.colorMode === "dark"
                                    ? lightenColor(props.theme.colors.pageBackground.dark, 0.3)
                                    : darkenColor(props.theme.colors.contentBackground.light, 0.2),
                            border: "none",
                        },
                    },
                }),
            },
        },
        Button: {
            variants: {
                HeaderButton: (props: StyleFunctionProps) => ({
                    bg: props.colorMode === "dark" ? lightenColor(props.theme.colors.pageBackground.dark, 0.1) : "contentBackground.light",
                    _hover: {
                        bg:
                            props.colorMode === "dark"
                                ? lightenColor(props.theme.colors.pageBackground.dark, 0.2)
                                : darkenColor(props.theme.colors.contentBackground.light, 0.15),
                    },
                    _active: {
                        bg:
                            props.colorMode === "dark"
                                ? lightenColor(props.theme.colors.pageBackground.dark, 0.3)
                                : darkenColor(props.theme.colors.contentBackground.light, 0.2),
                    },
                }),
                ConnectWallet: (props: StyleFunctionProps) => ({
                    bg: props.theme.colors.blue,
                    _hover: {
                        bg: lightenColor(props.theme.colors.blue, 0.1),
                    },
                    _active: {
                        bg: lightenColor(props.theme.colors.blue, 0.2),
                    },
                }),
                ShowResults: (props: StyleFunctionProps) => ({
                    bg: props.theme.colors.green,
                    _hover: {
                        bg: lightenColor(props.theme.colors.green, 0.1),
                    },
                    _active: {
                        bg: lightenColor(props.theme.colors.green, 0.2),
                    },
                }),
            },
        },
    },
    colors: {
        pageBackground: {
            light: "#FFFFFF",
            dark: "#101011",
        },
        pageBackgroundHover: {
            light: "#f0f7ed",
            dark: "#2a114c",
        },
        contentBackground: {
            light: "#eaebee",
            dark: "#0e052c",
        },
        border: {
            light: "#D3D3D3",
            dark: "#4f4f50",
        },
        checklistBar: {
            light: "#dfdfdf",
            dark: "#0c081b",
        },
        tableBorder: {
            light: "#EDF2F7",
            dark: "rgb(255, 255, 255, 0.2)",
        },
        divider: {
            light: "#dfdfdf",
            dark: "rgb(255, 255, 255, 0.2)",
        },
        gold: "#e7c60d",
        red: "#EC420C",
        green: "#289e33",
        blue: "#0da6d8",
        pink: "#b124b1",
        purple: "#54199b",
        orange: "#d66b13",
    },
})

export default customTheme
