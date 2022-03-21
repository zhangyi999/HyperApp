import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState } from "react";
import TokenSelectDialog from "./TokenSelectDialog";
import { Token } from "../../data/token";
import { Box, SxProps, Typography } from "@mui/material";

export function TokenSelect(props: {
  token?: Token;
  tokens?: Token[];
  sx?: SxProps;
  onChange: (token: Token) => void;
}) {
  const { token, tokens, onChange } = props;
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <React.Fragment>
      <TokenSelectDialog
        tokens={tokens}
        disabledTokens={token && [token]}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onTokenChange={onChange}
      />
      <Box
        sx={{
          py: 1.5,
          px: 1,
          cursor: "pointer",
          background: "rgba(2, 10, 26, 0.3)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          ...props.sx,
        }}
        onClick={() => setOpenDialog(true)}
      >
        <Box
          sx={{
            width: "2rem",
            height: "2rem",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1rem",
            overflow: "hidden",
            "& > img": {
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxheight: "100%",
              objectFit: "contain",
            },
          }}
        >
          {token ? <img src={token.icon} alt="" /> : "?"}
        </Box>

        <Box sx={{ flex: 1, display: "flex", alignItems: "end" }}>
          <Typography sx={{ px: 1, fontSize: 22, lineHeight: "24px" }}>
            {token ? token.name.toUpperCase() : "Select Token"}
          </Typography>
          {token && <Typography variant="caption">{token.fullName}</Typography>}
        </Box>
        {/* </div> */}

        <ArrowDropDownIcon fontSize="large" />
      </Box>
    </React.Fragment>
  );
}
