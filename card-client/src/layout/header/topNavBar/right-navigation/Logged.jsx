import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMenu } from "../menu/MenuProvider";
import { useTheme } from "../../../../providers/ThemeProvider";
import Zoom from '@mui/material/Zoom';

const Logged = () => {
  const setOpen = useMenu();
  const { theme } = useTheme();
  return (
    <Tooltip title="Open settings" TransitionComponent={Zoom}>
      <IconButton
        sx={{ p: 0, display: "inline-flex", marginLeft: 1 }}
        onClick={() => setOpen(true)}
      >
        <Avatar alt="user" sx={{ bgcolor: theme.palette.primary.dark, color: theme.palette.common.white}}>
          <AccountCircleIcon />
        </Avatar>
      </IconButton>
    </Tooltip>
  );
};

export default Logged;
