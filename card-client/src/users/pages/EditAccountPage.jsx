import { Container, Grid } from "@mui/material";
import React from "react";
import Box from '@mui/material/Box';

export default function EditAccountPage() {
  return (
    <Container sx={{ marginTop: "2%" }}>
      <Grid container>
        <Grid
          item
          md={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
            }}
            alt="about"
            src="/assets/images/under-construction.png"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
