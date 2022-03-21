import { Box, IconButton } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew"

export default function TransformButton(props: { onClick: VoidFunction }) {
    return (
      <Box sx={{ textAlign: "center", my: 1 }} >
        <IconButton onClick={props.onClick}>
          <AutorenewIcon />
        </IconButton>
      </Box>
    );
  }
  