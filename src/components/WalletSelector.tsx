import { Box, DialogContent, Grid, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { ConnectorNames, connectorsByName } from "../web3/connectors";
import Button from "./Button";
import Dialog from "./Dialog";

const iconsMap = {
  [ConnectorNames.Metamask]: "/icons/MetaMask.png",
  [ConnectorNames.WalletConnect]: "/icons/walletconnect.svg",
};
const WalletSelector: React.FC<{
  open: boolean;
  onClose?: VoidFunction;
}> = ({ open, onClose }) => {
  const { activate } = useWeb3React();
  return (
    <Dialog title="Wallet Connect" open={open} onClose={onClose}>
      <DialogContent sx={{ p: 2 }}>
        <Box sx={{ my: 2 }}>
          <TextLinear>Support Network</TextLinear>
          <Box sx={{ mx: "auto" }}>
            <Button
              fullWidth
              size="small"
              sx={{
                backgroundColor: "rgba(37,9,70,.38)",
                color: "#FFF",
              }}
            >
              Binance Smart Chain
            </Button>
          </Box>
        </Box>
        <Box sx={{ my: 2 }}>
          <TextLinear>Selected Wallet</TextLinear>
          <Grid container spacing={2}>
            {Object.keys(connectorsByName).map((name: string) => {
              const currentConnector =
                connectorsByName[name as keyof typeof connectorsByName];

              return (
                <Grid key={name} item xs={6}>
                  <GridItem
                    icon={iconsMap[name as keyof typeof connectorsByName]}
                    label={name}
                    onClick={() => {
                      activate(
                        currentConnector,
                        (error) => {
                          if (
                            error &&
                            error.name === "UserRejectedRequestError"
                          ) {
                            console.error("用户拒绝");
                            window.location.reload();
                          }
                        },
                        false
                      );
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default WalletSelector;

function TextLinear(props: { children: string }) {
  return (
    <Typography
      gutterBottom
      sx={{
        background: `linear-gradient(
              90deg,#4927d4,#9916b6)`,
        display: "inline-block",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {props.children}
    </Typography>
  );
}

function GridItem(props: {
  icon: string;
  label: string;
  onClick: VoidFunction;
}) {
  return (
    <Box
      onClick={props.onClick}
      sx={{
        cursor: "pointer",
        backgroundColor: "rgba(37,9,70,.38)",
        borderRadius: "1rem",
        p: 2,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: "2rem",
          height: "2rem",
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          "& > img": {
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxheight: "100%",
            objectFit: "contain",
          },
        }}
      >
        <img src={props.icon} alt="" />
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 1, fontSize: "12px" }}>
        {props.label}
      </Typography>
    </Box>
  );
}
