import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./figma-color-variables.css";
import "./index.css";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#0d4ac3",
    },
  },
  typography: {
    fontFamily: "var(--zui-font-system)",
    fontSize: 13,
    body1: {
      fontSize: "var(--font-body-m-size)",
      fontWeight: "var(--font-body-m-weight)",
      lineHeight: "var(--font-body-m-line-height)",
      letterSpacing: "var(--font-body-m-letter-spacing)",
    },
    body2: {
      fontSize: "var(--font-body-m-size)",
      fontWeight: "var(--font-body-m-weight)",
      lineHeight: "var(--font-body-m-line-height)",
      letterSpacing: "var(--font-body-m-letter-spacing)",
    },
    button: {
      fontSize: "var(--font-button-size)",
      fontWeight: "var(--font-button-weight)",
      lineHeight: "var(--font-button-line-height)",
      letterSpacing: "var(--font-button-letter-spacing)",
      textTransform: "capitalize",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "var(--zui-font-system)",
          fontSize: "var(--font-body-m-size)",
          lineHeight: "var(--font-body-m-line-height)",
          letterSpacing: "var(--font-body-m-letter-spacing)",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "var(--occam-elevation-2dp)",
        },
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          variants: [
            {
              props: { size: "small" },
              style: ({ theme }) => ({
                margin: theme.spacing(0.75, 0.5),
              }),
            },
          ],
        },
        thumb: ({ theme }) => ({
          boxShadow: theme.shadows[1],
        }),
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
        label: ({ theme }) => ({
          ...theme.typography.body2,
          color: "rgba(0, 0, 0, 0.9)",
        }),
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
