import { Box } from "@mui/material";
import React from "react";
import AppBar from "./AppBar";

const Layout: React.FC = ({ children }) => {
  return (
    <Box>
      <AppBar />
      <Box
        sx={{
          mb: {
            xs: 8,
            sm: 0,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
export default Layout;
