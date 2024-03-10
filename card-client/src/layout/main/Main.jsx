import { Box } from "@mui/material";
import { node } from "prop-types";
import React from "react";
import { useTheme } from "../../providers/ThemeProvider";

export default function Main({ children }) {
  const { theme } = useTheme();
  return (
    <React.Fragment>
      <Box
        sx={{
          minHeight: "86.8vh",
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          paddingTop: "25px"
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

Main.propTypes = {
  children: node.isRequired,
};
