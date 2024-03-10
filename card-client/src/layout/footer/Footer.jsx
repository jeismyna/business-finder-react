import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import InfoIcon from "@mui/icons-material/Info";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUser } from "../../users/providers/UserProvider";

export default function Footer() {
  const { user } = useUser();

  return (
    <React.Fragment>
      <Paper sx={{ position: 'sticky', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={useLocation().pathname}
        >
          <BottomNavigationAction
            label="About"
            component={Link}
            to={ROUTES.ABOUT}
            value={ROUTES.ABOUT}
            icon={<InfoIcon />}
          />
          {user && (
            <BottomNavigationAction
              label="Favorite cards"
              component={Link}
              to={ROUTES.FAV_CARDS}
              value={ROUTES.FAV_CARDS}
              icon={<FavoriteIcon />}
            />
          )}
          {user?.isBusiness && (
            <BottomNavigationAction
              label="My cards"
              component={Link}
              to={ROUTES.MY_CARDS}
              value={ROUTES.MY_CARDS}
              icon={<RecentActorsIcon />}
            />
          )}
        </BottomNavigation>
      </Paper>
    </React.Fragment>
  );
}
