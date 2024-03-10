import React from "react";
import { string } from "prop-types";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Error = ({ errorMessage }) => {
  return (
    <Container >
      <Grid container spacing={2} sx={{ marginTop: "40px" }}>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" align="center">
            Oops... something went wrong: {errorMessage}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} sx={{ display: "flex" }} justifyContent="center">
          <img className="error-img"
            src="/assets/images/broken-robot-error.png"
            alt="broken robot"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

Error.propTypes = {
  errorMessage: string.isRequired,
};

export default Error;
