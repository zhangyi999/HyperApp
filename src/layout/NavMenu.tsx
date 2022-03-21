import { Box, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/system";

import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const menus = [
  {
    name: "兑换",
    path: "/",
  },
  {
    name: "流动池",
    path: "/pools",
    activeRoutes: ["/pools", "/pools/add"],
  },
  {
    name: "投票",
    path: "/dao",
  },
];

const NavMenu: React.FC = () => {
  const loc = useLocation();
  const match = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  const positionSX = useMemo(() => {
    if (match) {
      return {};
    }
    return {
      position: "fixed",
      left: 0,
      bottom: "1rem",
      width: "100%",
      height: "4rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  }, [match]);

  return (
    <Box sx={positionSX}>
      <Box
        sx={{
          height: "2.5rem",
          borderRadius: "1.25rem",
          p: "2px",
          boxSizing: "border-box",
          background:
            "padding-box padding-box, border-box border-box rgba(0, 0, 0, 0.3)",
        }}
      >
        <Stack
          direction={"row"}
          alignItems="stretch"
          sx={{
            height: "100%",
          }}
        >
          {menus.map((item) => {
            const active = item.activeRoutes
              ? item.activeRoutes.includes(loc.pathname)
              : loc.pathname === item.path;
            return (
              <MenuItem active={active} to={item.path} key={item.path}>
                {item.name}
              </MenuItem>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};
export default NavMenu;

const MenuItem: React.FC<{ to: string; active: boolean }> = ({
  to,
  active,
  children,
}) => {
  return (
    <Box
      sx={{
        background: active
          ? `linear-gradient(
        90deg,#4927d4,#9916b6)`
          : "transparnet",
        color: "#FFFFFF",
        display: "block",
        height: "100%",
        borderRadius: "2rem",
        boxSizing: "border-box",
        minWidth: "92px",
        textAlign: "center",
        px: 1.5,
        fontWeight: 500,

        "> a": {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Link to={to}>{children}</Link>
    </Box>
  );
};
