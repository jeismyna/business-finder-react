import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useCallback, useContext, useState } from "react";

const SnackbarContext = createContext();

export default function SnackbarProvider({ children }) {
  const [isSnackOpen, setOpenSnack] = useState(false);
  const [snackColor, setSnackColor] = useState("success");
  const [snackVariant, setSnackVariant] = useState("filled");
  const [snackMessage, setSnackMessage] = useState("in snackbar");

  const setSnack = useCallback((color, message, variant = "filled") => {
    setOpenSnack(true);
    setSnackColor(color);
    setSnackVariant(variant);
    setSnackMessage(message);
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSnackOpen}
        onClose={() => setOpenSnack((prev) => !prev)}
        autoHideDuration={3000}
      >
        <Alert severity={snackColor} variant={snackVariant}>
          {snackMessage}
        </Alert>
      </Snackbar>
      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>
    </React.Fragment>
  );
}

export const useSnack = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw Error("useSnackbar must be used within a NameProvider");
  return context;
};
