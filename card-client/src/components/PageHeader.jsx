import React from "react";
import { Divider, Typography } from "@mui/material";
import { string } from "prop-types";

const PageHeader = ({ title, subtitle }) => {
  return (
    <React.Fragment>
      <Typography variant="h2" component="h1" align="center" paddingTop={1}>
        {title}
      </Typography>
      <Typography variant="h5" component="h2" align="center">
        {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </React.Fragment>
  );
};

export default PageHeader;

PageHeader.propTypes = {
  title: string.isRequired,
  subtitle: string,
};
