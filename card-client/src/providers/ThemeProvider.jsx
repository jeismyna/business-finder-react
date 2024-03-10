import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { node } from "prop-types";
import { pink, indigo, blue, grey, common, brown } from '@mui/material/colors';

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [isDark, setDark] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setDark((prev) => !prev);
  }, [setDark]);


  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        ...indigo,
        lighter: indigo[50],
        dark: indigo[900],
        ...(mode === 'dark' && {
          light: pink[100],
          main: pink[800],
          dark: pink[900]
        }),
      },
      secondary: {
        ...blue,
        ...(mode === 'dark' && {
          ...brown
        }),
      },
      background: {
        default: indigo[50],
        paper: common.white,
        ...(mode === 'dark' && {
          default: grey[900],
          paper: grey[800],
        }),
      },
      text: {
        ...(mode === 'light'
          ? {
            primary: grey[900],
            secondary: grey[800],
          }
          : {
            primary: '#fff',
            secondary: grey[300],
          }),
      },
    },
    components: {
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              ...(mode === 'dark' && {
                color: pink[200]
              }),
            }
          },
        },
      },
    },
  });

  const theme = isDark ? createTheme(getDesignTokens('dark')) : createTheme(getDesignTokens('light'));

  const value = useMemo(
    () => ({ theme, toggleDarkMode }),
    [theme, toggleDarkMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a NameProvider");
  return context;
};

ThemeProvider.propTypes = {
  children: node.isRequired,
};
