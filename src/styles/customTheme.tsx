import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/theme-tools"
import { color } from "framer-motion"
import { lighten, darken } from "polished"

import { keyframes } from "@emotion/react"

function lightenColor(mainColor, value) {
    return lighten(value, mainColor)
}
function darkenColor(mainColor, value) {
    return darken(value, mainColor)
}

const rainbowAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const customTheme = extendTheme({
    fonts: {
        heading: `'Poppins', sans-serif`,
        body: `'Poppins', sans-serif`,
    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            ".bgPage": {
                bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
            },
            ".contentContainer": {
                bg:
                    props.colorMode === "dark"
                        ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                        : darkenColor(props.theme.colors.contentBackground.light, 0),
            },
            ".currentAddressInfoContainer": {
                bg:
                    props.colorMode === "dark"
                        ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                        : darkenColor(props.theme.colors.contentBackground.light, 0),
                border: "4px solid green",
            },
            ".pageWidth": {
                maxWidth: "95vw",
                width: "620px",
            },
            ".tooltip": {
                bg:
                    props.colorMode === "dark"
                        ? `${lightenColor(props.theme.colors.pageBackground.dark, 0.1)} !important`
                        : `${darkenColor(props.theme.colors.pageBackground.light, 0.05)} !important`,
                [cssVar("popper-arrow-bg").variable]:
                    props.colorMode === "dark"
                        ? `${lightenColor(props.theme.colors.pageBackground.dark, 0.1)} !important`
                        : `${darkenColor(props.theme.colors.pageBackground.light, 0.05)} !important`,
            },
            ".tooltipLabel": {
                paddingX: "10px",
                paddingY: "5px",
                borderRadius: "7px",
                color: "var(--chakra-colors-chakra-body-text)",
            },
            // Increase the tooltip arrow size
            "div .chakra-tooltip__arrow": {
                width: "130% !important",
                height: "130% !important",
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
                                ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                                : darkenColor(props.theme.colors.contentBackground.light, 0),
                        _focus: {
                            bg:
                                props.colorMode === "dark"
                                    ? lightenColor(props.theme.colors.pageBackground.dark, 0.15)
                                    : darkenColor(props.theme.colors.contentBackground.light, 0.1),
                            border: "none",
                        },
                    },
                }),
            },
        },
        Tabs: {
            variants: {
                RewardsTabs: (props: StyleFunctionProps) => ({
                    tab: {
                        borderRadius: "20px 20px 0px 0px",
                        borderBottom: "2px solid",
                        bg:
                            props.colorMode === "dark"
                                ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                                : darkenColor(props.theme.colors.contentBackground.light, 0),
                        _selected: {
                            border: "2px solid",
                            borderBottom: "2px transparent",
                            bg:
                                props.colorMode === "dark"
                                    ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                                    : darkenColor(props.theme.colors.contentBackground.light, 0),
                            _hover: {
                                bg:
                                    props.colorMode === "dark"
                                        ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                                        : darkenColor(props.theme.colors.contentBackground.light, 0.0),
                                cursor: "default",
                            },
                        },
                        _hover: {
                            bg:
                                props.colorMode === "dark"
                                    ? lightenColor(props.theme.colors.pageBackground.dark, 0.1)
                                    : darkenColor(props.theme.colors.contentBackground.light, 0.1),
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
                ConnectWalletButton: (props: StyleFunctionProps) => ({
                    border: "3px solid",
                    borderColor: "blue",
                    bg:
                        props.colorMode === "dark"
                            ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                            : darkenColor(props.theme.colors.contentBackground.light, 0),
                    _hover: {
                        bg: props.colorMode === "dark" ? darkenColor(props.theme.colors.blue, 0.2) : lightenColor(props.theme.colors.blue, 0.2),
                    },
                    _active: {
                        bg: "blue",
                    },
                }),
                ClaimRewardsButton: (props: StyleFunctionProps) => ({
                    filter: "brightness(1.7)",
                    _hover: {
                        transform: "scale(1.05)",
                    },
                    _active: {
                        filter: "brightness(1.9)",
                    },
                    backgroundImage: "linear-gradient(270deg, pink, purple, blue, red, blue, purple, pink)",
                    backgroundSize: "1000% 1000%",
                    animation: `${rainbowAnimation} 20s linear infinite`,
                    textShadow: props.colorMode === "dark" ? "0px 0px 5px black" : "0px",
                }),
                ClaimRewardsDisabledButton: (props: StyleFunctionProps) => ({
                    backgroundImage: "linear-gradient(270deg, pink, purple, blue, red, blue, purple, pink)",
                    backgroundSize: "1000% 1000%",
                    animation: `${rainbowAnimation} 20s linear infinite`,
                    textShadow: props.colorMode === "dark" ? "0px 0px 5px black" : "0px",
                    cursor: "default",
                    pointerEvents: "none",
                }),
                ShowResultsButton: (props: StyleFunctionProps) => ({
                    border: "3px solid",
                    borderColor: "green",
                    bg:
                        props.colorMode === "dark"
                            ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                            : darkenColor(props.theme.colors.contentBackground.light, 0),
                    _hover: {
                        bg: props.colorMode === "dark" ? darkenColor(props.theme.colors.green, 0.2) : lightenColor(props.theme.colors.green, 0.2),
                    },
                    _active: {
                        bg: "green",
                    },
                }),
                WalletButton: (props: StyleFunctionProps) => ({
                    border: "3px solid",
                    borderColor: "orange",
                    bg:
                        props.colorMode === "dark"
                            ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                            : darkenColor(props.theme.colors.contentBackground.light, 0),
                    _hover: {
                        bg: props.colorMode === "dark" ? darkenColor(props.theme.colors.orange, 0.2) : lightenColor(props.theme.colors.orange, 0.2),
                    },
                    _active: {
                        bg: "orange",
                    },
                }),
                ShowResultsButtonError: (props: StyleFunctionProps) => ({
                    border: "3px solid",
                    borderColor: "red",
                    fontSize: "sm",
                    bg:
                        props.colorMode === "dark"
                            ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                            : darkenColor(props.theme.colors.contentBackground.light, 0),
                    cursor: "default",
                }),
            },
        },
        Checkbox: {
            baseStyle: (props: StyleFunctionProps) => ({
                container: {
                    _hover: {
                        ".chakra-checkbox__control": {
                            bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                        },
                    },
                },
                control: {
                    _checked: {
                        color: props.colorMode === "dark" ? "white" : "black",
                        borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                    },
                    _hover: {
                        bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    },
                },
            }),
        },
    },
    colors: {
        pageBackground: {
            light: "#EFF6FF",
            dark: "#101011",
        },
        pageBackgroundHover: {
            light: "#f0f7ed",
            dark: "#2a114c",
        },
        contentBackground: {
            light: "#ffffff",
            dark: "#62CFFF",
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
