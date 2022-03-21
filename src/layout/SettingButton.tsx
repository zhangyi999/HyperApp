import Settings from "@mui/icons-material/Settings";
import {
  Box,
  Button as MuiButton,
  Card,
  OutlinedInput,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Button from "../components/Button";
import Text from "../components/Text";
import { useSetting } from "../contexts/setting";
import { numberFromString } from "../utils/number";

const SettingMuiButton: React.FC = () => {
  const { setting, setSetting } = useSetting();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <MuiButton
        sx={{
          minWidth: "auto",
          backgroundColor: "rgba(75,36,103,0.66)",
          color: "rgb(170, 145, 249)",
        }}
        onClick={handleClick}
      >
        <Settings fontSize="small" />
      </MuiButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: "240px",
            py: 1.5,
            px: 2,
          }}
        >
          <Typography variant="subtitle2">交易设置</Typography>
          <Box sx={{ my: 1.5 }}>
            <Text sx={{ fontSize: "0.875rem" }}>滑点容差</Text>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button size="small" rounded="full" variant="contained">
                自动
              </Button>
              <OutlinedInput
                size="small"
                defaultValue={setting.userSlippageTolerance}
                onBlur={(e) => {
                  const value = e.target.value;
                  const userSlippageTolerance = numberFromString(value, 2);
                  console.log("userSlippageTolerance:", userSlippageTolerance);
                  e.target.value = userSlippageTolerance.toFixed(2);
                  setSetting({
                    userSlippageTolerance,
                  });
                }}
                margin="none"
                placeholder="0.10"
                sx={{
                  borderRadius: "99px",
                  pr: 1.5,

                  "& > input": {
                    textAlign: "right",
                    pr: 0.5,
                    py: 0.5,
                  },
                }}
                endAdornment="%"
              />
            </Stack>
          </Box>
          <Box sx={{ my: 1.5 }}>
            <Text sx={{ fontSize: "0.875rem" }}>交易截止期限</Text>
            <Stack direction="row" alignItems="center" spacing={2}>
              <OutlinedInput
                size="small"
                margin="none"
                placeholder="30"
                sx={{
                  borderRadius: "99px",
                  width: 60,
                  mr: 1,
                  "& > input": {
                    textAlign: "right",
                    py: 0.5,
                  },
                }}
              />
              分钟
            </Stack>
          </Box>
        </Card>
      </Popover>
    </Box>
  );
};
export default SettingMuiButton;
