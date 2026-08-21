// material
import { CssBaseline, ThemeOptions } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import type { JSX } from "react";

// ----------------------------------------------------------------------

type ThemeConfigType = {
  children: JSX.Element | JSX.Element[];
};

export const fontFamilyApp = [
  '"Plus Jakarta Sans"',
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
].join(", ");

/**
 * Tokens de marca reutilizados fora do `theme` (gradientes, tiles de categoria,
 * fundos suaves). Mantidos aqui para existir uma única fonte de verdade visual.
 */
export const tokens = {
  gradienteMarca:
    "linear-gradient(135deg, #5D6BC4 0%, #7B74CE 52%, #A183CE 100%)",
  gradienteSuave:
    "linear-gradient(180deg, #FFFFFF 0%, #F7F8FD 55%, #F2F4FC 100%)",
  superficie: "#F5F6FB",
  borda: "rgba(37, 41, 57, 0.08)",
  bordaForte: "rgba(37, 41, 57, 0.14)",
  sombraCartao: "0px 2px 10px rgba(37, 41, 57, 0.05)",
  sombraFlutuante: "0px 10px 30px rgba(37, 41, 57, 0.10)",
};

const sombras = [
  "none",
  ...Array.from({ length: 24 }, (_, indice) => {
    const nivel = indice + 1;
    const deslocamento = Math.max(1, Math.round(nivel * 0.85));
    const desfoque = Math.round(nivel * 2.1) + 6;
    const opacidade = (0.03 + nivel * 0.004).toFixed(3);
    return `0px ${deslocamento}px ${desfoque}px rgba(37, 41, 57, ${opacidade})`;
  }),
] as ThemeOptions["shadows"];

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#5D6BC4",
      light: "#8A95E0",
      dark: "#3D4894",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D9A64E",
      light: "#F0CB8A",
      dark: "#A97C2C",
      contrastText: "#3B2C0D",
    },
    info: { main: "#4C8DD9", light: "#8FBBEB", dark: "#2F669F" },
    success: { main: "#3F9E7C", light: "#8AC9B3", dark: "#2A7157" },
    warning: { main: "#D9A64E", light: "#F0CB8A", dark: "#A97C2C" },
    error: { main: "#D97070", light: "#EFACAC", dark: "#A94B4B" },
    background: {
      default: tokens.superficie,
      paper: "#FFFFFF",
    },
    text: {
      primary: "#252939",
      secondary: "#6B7286",
      disabled: "#A2A7B8",
    },
    divider: tokens.borda,
  },
  shape: { borderRadius: 16 },
  shadows: sombras,
  typography: {
    fontFamily: fontFamilyApp,
    h1: { fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.015em" },
    h4: {
      fontSize: "1.375rem",
      fontWeight: 700,
      letterSpacing: "-0.015em",
      lineHeight: 1.3,
    },
    h5: { fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.01em" },
    h6: { fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em" },
    subtitle1: { fontSize: "0.9375rem", fontWeight: 600, lineHeight: 1.45 },
    subtitle2: { fontSize: "0.8125rem", fontWeight: 600, lineHeight: 1.45 },
    body1: { fontSize: "1rem", lineHeight: 1.65 },
    body2: { fontSize: "0.875rem", lineHeight: 1.6 },
    caption: { fontSize: "0.75rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0 },
    overline: {
      textTransform: "uppercase",
      fontWeight: 700,
      fontSize: "0.6875rem",
      letterSpacing: "0.09em",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        colorPrimary: {
          backgroundImage: tokens.gradienteMarca,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: { minHeight: 60, paddingLeft: 8, paddingRight: 8 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
        rounded: { borderRadius: 18 },
        outlined: { borderColor: tokens.borda },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: `1px solid ${tokens.borda}`,
          boxShadow: tokens.sombraCartao,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          minHeight: 44,
          paddingLeft: 20,
          paddingRight: 20,
        },
        sizeSmall: { minHeight: 36, paddingLeft: 14, paddingRight: 14 },
        outlined: { borderColor: tokens.bordaForte },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingTop: 12,
          paddingBottom: 12,
          transition: "background-color .18s ease",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: { fontWeight: 600, lineHeight: 1.4 },
        secondary: { fontSize: "0.8125rem" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
        sizeSmall: { height: 22, fontSize: "0.6875rem" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 22, margin: 16, width: "calc(100% - 32px)" },
        paperFullScreen: { borderRadius: 0, margin: 0, width: "100%" },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { fontSize: "1.125rem", fontWeight: 700, paddingBottom: 8 },
      },
    },
    MuiAlert: {
      defaultProps: { variant: "standard" },
      styleOverrides: {
        root: { borderRadius: 14, alignItems: "center" },
        message: { paddingTop: 6, paddingBottom: 6 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { minWidth: 46, minHeight: 46, fontWeight: 700 },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { height: 3, borderRadius: 3 },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 3 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: tokens.borda },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default function ThemeConfig({
  children,
}: ThemeConfigType): JSX.Element {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export { theme };
