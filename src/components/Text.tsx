import { SxProps, Typography } from "@mui/material";
import React from "react";

const Text: React.FC<{
  sx?: SxProps;
}> = ({ children, sx }) => {
  return (
    <Typography
      gutterBottom
      sx={{ color: "#a38bf0", fontFamily: "inherit", ...sx }}
    >
      {children}
    </Typography>
  );
};
export default Text;
