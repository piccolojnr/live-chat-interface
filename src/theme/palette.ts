import { PaletteMode } from "@mui/material";
import chroma from "chroma-js";

export const grey = {
    0: "#FFFFFF",
    100: "#F9FAFB",
    200: "#F4F6F8",
    300: "#DFE3E8",
    400: "#C4CDD5",
    500: "#919EAB",
    600: "#637381",
    700: "#454F5B",
    800: "#212B36",
    900: "#161C24",
};

const primaryColor = "#00bcd4";
export const primary = {
    lighter: chroma(primaryColor).brighten(2).hex(),
    light: chroma(primaryColor).brighten(1).hex(),
    main: primaryColor,
    dark: chroma(primaryColor).darken(1).hex(),
    darker: chroma(primaryColor).darken(2).hex(),
    contrastText: "#FFFFFF",
};

// Define other color palettes similarly
const secondaryColor = "#8E33FF";
export const secondary = {
    lighter: chroma(secondaryColor).brighten(2).hex(),
    light: chroma(secondaryColor).brighten(1).hex(),
    main: secondaryColor,
    dark: chroma(secondaryColor).darken(1).hex(),
    darker: chroma(secondaryColor).darken(2).hex(),
    contrastText: "#FFFFFF",
};

export const info = {
    lighter: "#CAFDF5",
    light: "#61F3F3",
    main: "#00B8D9",
    dark: "#006C9C",
    darker: "#003768",
    contrastText: "#FFFFFF",
};

export const success = {
    lighter: "#C8FAD6",
    light: "#5BE49B",
    main: "#00A76F",
    dark: "#007867",
    darker: "#004B50",
    contrastText: "#FFFFFF",
};

export const warning = {
    lighter: "#FFF5CC",
    light: "#FFD666",
    main: "#FFAB00",
    dark: "#B76E00",
    darker: "#7A4100",
    contrastText: grey[800],
};

export const error = {
    lighter: "#FFE9D5",
    light: "#FFAC82",
    main: "#FF5630",
    dark: "#B71D18",
    darker: "#7A0916",
    contrastText: "#FFFFFF",
};

export const common = {
    black: "#000000",
    white: "#FFFFFF",
};

export const action = {
    hover: chroma(grey[500]).alpha(0.08).css(),
    selected: chroma(grey[500]).alpha(0.16).css(),
    disabled: chroma(grey[500]).alpha(0.8).css(),
    disabledBackground: chroma(grey[500]).alpha(0.24).css(),
    focus: chroma(grey[500]).alpha(0.24).css(),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
};

export const alpha = (color: string, opacity: number) =>
    chroma(color).alpha(opacity).hex();

const base = {
    primary,
    secondary,
    grey,
    common,
    divider: chroma(grey[500]).alpha(0.2).css(),
    action,
};

const lightPalette = {
    ...base,
    text: {
        primary: grey[800],
        secondary: grey[600],
        disabled: grey[500],
    },
    background: {
        paper: "#FFFFFF",
        default: grey[100],
        neutral: grey[400],
    },
    action: {
        ...base.action,
        active: grey[600],
    },
    info,
    error,
    success,
    warning,
};

const darkPalette = {
    ...base,
    text: {
        primary: grey[100],
        secondary: grey[300],
        disabled: grey[500],
    },
    background: {
        paper: grey[900],
        default: grey[800],
        neutral: grey[700],
    },
    action: {
        ...base.action,
        active: grey[300],
    },
    info: {
        lighter: "#A4E5F6",
        light: "#52C1E5",
        main: "#0093C4",
        dark: "#00679A",
        darker: "#003C6F",
        contrastText: "#FFFFFF",
    },
    error: {
        lighter: "#FFC9BD",
        light: "#FF8978",
        main: "#FF4C3F",
        dark: "#B71D18",
        darker: "#7A0916",
        contrastText: "#FFFFFF",
    },
    success: {
        lighter: "#BBEFD4",
        light: "#63D69E",
        main: "#00A86B",
        dark: "#007751",
        darker: "#004936",
        contrastText: "#FFFFFF",
    },
    warning: {
        lighter: "#FFE9A6",
        light: "#FFD742",
        main: "#FFC400",
        dark: "#B28200",
        darker: "#7A5600",
        contrastText: grey[900],
    },
};

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ?
            lightPalette
            :
            darkPalette
        )
    },
});

export default getDesignTokens;
