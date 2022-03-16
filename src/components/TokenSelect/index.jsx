import styledComponents from "styled-components";
import { TextMD, TextSM } from "..";
import Coin from "../Coin";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Box } from "@material-ui/core";
import React, { useState } from "react";
import TokenSelectDialog from "./TokenSelectDialog";

const Wrap = styledComponents.div`
    padding: 1.2rem 0.8rem;
    cursor: pointer;
    background: rgba(2, 10, 26, 0.3);
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: relative;
    /* just */
    ${(p) => p.style}
`;

export function TokenSelect({ coin, coinName, wrapStyle }) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <React.Fragment>
      <TokenSelectDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onTokenChange={(token) => {
          console.log("you select ", token);
        }}
      />
      <Wrap style={wrapStyle} onClick={() => setOpenDialog(true)}>
        <Coin
          size="32"
          style={{
            border: "2px solid rgba(0,0,0,0.3)",
            borderRadius: "100px",
          }}
          type={coin}
        />

        <Box sx={{ flex: 1 }}>
          <TextMD style={{ padding: "0 .6rem" }}>{coinName}</TextMD>
          <TextSM color="2">{coin.toUpperCase()}</TextSM>
        </Box>
        {/* </div> */}

        <ArrowDropDownIcon fontSize="large" />
      </Wrap>
    </React.Fragment>
  );
}
