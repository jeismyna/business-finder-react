import React from "react";
import { useNavigate } from "react-router-dom";
import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";
import useUsers from "../../../../users/hooks/useUsers";
import MenuLink from "../../../../routes/components/MenuLink";
import { useTheme } from "../../../../providers/ThemeProvider";
import { Typography, Divider } from "@mui/material";

const Menu = ({ isOpen, anchorEl, onClose }) => {
  const { user } = useUser();
  const { handleLogout } = useUsers();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const onLogout = () => {
    handleLogout();
    navigate(ROUTES.ROOT);
    onClose();
  };

  return (
    <MuiMenu className={theme.palette.mode === 'dark' ? "MuiMenuDark" : "MuiMenu"}
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ maxWidth: 300, px: 2, marginLeft: -1 }}>
        {user && (
          <React.Fragment>
            <Typography variant="h6" sx={{ marginLeft: "1rem", marginBottom: "0.5rem", overflowWrap: "anywhere" }}>{user.firstName ? user.firstName : user.name.first}</Typography>
            <Divider />
          </React.Fragment>
        )}
        <MenuLink
          text="about"
          navigateTo={ROUTES.ABOUT}
          onClick={onClose}
          styles={{ display: { SVGFEMergeNodeElement: "block", md: "none" } }}
        />

        {!user && (
          <React.Fragment>
            <MenuLink
              text="login"
              navigateTo={ROUTES.LOGIN}
              onClick={onClose}
              styles={{ display: { xs: "flex", md: "none" } }}
            />
            <MenuLink
              text="signup"
              navigateTo={ROUTES.SIGNUP}
              onClick={onClose}
              styles={{ display: { xs: "flex", md: "none" } }}
            />
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <MenuLink
              text="favorite cards"
              navigateTo={ROUTES.FAV_CARDS}
              onClick={onClose}
              styles={{ display: { xs: "flex", md: "none" } }}
            />
            {user?.isBusiness && (
              <MenuLink
                text="my cards"
                navigateTo={ROUTES.MY_CARDS}
                onClick={onClose}
                styles={{ display: { xs: "flex", md: "none" } }}
              />)}
            {user?.isAdmin && (
              <MenuLink
                text="sandbox"
                navigateTo={ROUTES.SANDBOX}
                onClick={onClose}
                styles={{ display: { xs: "flex", md: "none" } }}
              />)}
            <MenuLink
              text="profile"
              navigateTo={`${ROUTES.USER_PROFILE}/${user.id}`}
              onClick={onClose}
            />
            <MenuLink
              text="edit account"
              navigateTo={ROUTES.EDIT_USER}
              onClick={onClose}
            />
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </React.Fragment>
        )}
      </Box>
    </MuiMenu>
  );
};

export default Menu;
