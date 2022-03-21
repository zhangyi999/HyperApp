import {
  AppBar as MuiAppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import SettingButton from "./SettingButton";
import ConnectWallet from "./ConnectWallet";
import NavMenu from "./NavMenu";

const AppBar: React.FC = () => {
  return (
    <>
      <MuiAppBar
        elevation={0}
        sx={{
          background: "transparent",
        }}
      >
        <Container sx={{ px: "0 !important" }}>
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Logo />
            <NavMenu />
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1.5,
              }}
            >
              <SettingButton />
              <ConnectWallet />
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
      <Toolbar />
    </>
  );
};
export default AppBar;

const Logo: React.FC = () => {
  return (
    <Stack direction={"row"} alignItems="center" sx={{ flex: 1 }}>
      <img
        src="/logo.svg"
        alt=""
        style={{
          width: "2rem",
          height: "2rem",
        }}
      />
      <Typography
        variant="h5"
        sx={{ ml: 1, fontWeight: 800, fontFamily: "inherit" }}
      >
        HyperSwap
      </Typography>
    </Stack>
  );
};
