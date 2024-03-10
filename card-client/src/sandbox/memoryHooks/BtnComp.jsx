import { Button } from "@mui/material";
import React, { memo } from "react";

function BtnComp({ handleClick, children }) {
  console.log("The btn comp is render " + children);
  return (
    <React.Fragment>
      <Button onClick={handleClick}>{children}</Button>
    </React.Fragment>
  );
}

export default memo(BtnComp);
