import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/theme-tools"
import { lighten, darken } from "polished"

function lightenColor(colorMode, mainColor, value) {
    return colorMode === "dark" ? lighten(value, mainColor) : darken(value, mainColor)
}
function darkenColor(colorMode, mainColor, value) {
    return colorMode === "dark" ? darken(value, mainColor) : lighten(value, mainColor)
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
                // borderColor: darkenColor(props.colorMode, props.theme.colors.border.dark, 0.05),
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
        Button: {
            baseStyle: (props: StyleFunctionProps) => ({
                bg: props.colorMode === "dark" ? "blue" : "pageBackground.light",
                _hover: {
                    bg: props.colorMode === "dark" ? "green" : "pageBackgroundHover.light",
                },
                _active: {
                    bg: props.colorMode === "dark" ? "yellow" : "pageBackground.light",
                },
            }),
        },
    },
    colors: {
        pageBackground: {
            light: "#FFFFFF",
            dark: "#0F1720",
        },
        pageBackgroundHover: {
            light: "#EDF2F7",
            dark: "#2a114c",
        },
        contentBackground: {
            light: "#EDF2F7",
            dark: "#0e052c",
        },
        border: {
            light: "#D3D3D3",
            dark: "#54199b",
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
