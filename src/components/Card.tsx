import { Paper, SxProps } from "@mui/material";
import React from "react";

const Card: React.FC<{
  maxWidth?: number;
  sx?: SxProps;
}> = ({ children, sx, maxWidth }) => {
  return (
    <Paper
      sx={{
        maxWidth,
        mx: "auto",
        borderRadius: "1rem",
        p: 2,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};
export default Card;
