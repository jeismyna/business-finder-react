import { node, object, string } from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";

export default function NavBarLink({ to, children, sx }) {

  const { theme } = useTheme();

  return (
    <NavLink to={to} style={({ isActive }) => ({ backgroundColor: (isActive && to !== "/") ? theme.palette.primary.dark : "", ...sx })}>
      {children}
    </NavLink>
  );
}

NavBarLink.propTypes = {
  to: string.isRequired,
  children: node.isRequired,
  sx: object,
};


