import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  Container,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../components/Card";
import Text from "../../components/Text";
import { TabContext, TabList } from "@mui/lab";
import FormItem from "../../components/FormItem";
import { TokenSelect } from "../../components/TokenSelect";
import TokenData, { Token } from "../../data/token";
import Button from "../../components/Button";

const AddPool: React.FC = () => {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState("0");
  const [currencyPairs1, setCurrencyPairs1] = useState(TokenData[0]);
  const [currencyPairs2, setCurrencyPairs2] = useState(TokenData[1]);

  return (
    <Container sx={{ maxWidth: "800px !important", py: 2 }}>
      <Toolbar sx={{ px: "0 !important" }}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <Typography sx={{ ml: 1 }}>添加流动性</Typography>
      </Toolbar>
      <Card>
        <Box sx={{ my: 2 }}>
          <TabContext value={currentTab}>
            <TabList
              onChange={(_, v) => setCurrentTab(v)}
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "text.secondary",
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "1rem",
                  p: 0,
                  minWidth: "auto",
                  mr: 1,
                  color: "grey.400",

                  "&.Mui-selected": {
                    color: "text.secondary",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                  },
                },
              }}
            >
              <Tab disableRipple label="选择币对" value={"0"}></Tab>
              <Tab disableRipple label="检索币对" value={"1"}></Tab>
            </TabList>
            <TabPanel value={"0"}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormItem label="代币">
                    <TokenSelect
                      token={currencyPairs1}
                      onChange={setCurrencyPairs1}
                      sx={{ backgroundColor: "transparent" }}
                    />
                  </FormItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormItem label="流动性代币">
                    <TokenSelect
                      token={currencyPairs2}
                      onChange={setCurrencyPairs2}
                      sx={{ backgroundColor: "transparent" }}
                    />
                  </FormItem>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={"1"}>
              <FormItem label="Address">
                <Box
                  sx={{
                    py: 1.5,
                    px: 1,
                  }}
                >
                  <Box
                    component="input"
                    placeholder="输入代币，流动性代币，流动性池的合约地址"
                    sx={{
                      backgroundColor: "transparent",
                      height: "35px",
                      lineHeight: "35px",
                      boxSizing: "border-box",
                      border: "unset",
                      color: "#FFF",
                      fontSize: "1rem",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                </Box>
              </FormItem>
            </TabPanel>
          </TabContext>
          <Container>
            <FormItem label="流动池合约地址">
              <AddressSelect />
            </FormItem>
          </Container>
        </Box>
        <Box>
          <Text>充值数额</Text>

          <Container sx={{ py: 1 }}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <RechargeInput token={currencyPairs1} />
                <RechargeInput token={currencyPairs2} />
                <RechargeInput token={currencyPairs1} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ px: 2 }}>
                  <Box>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1" sx={{ color: "#bebfc8" }}>
                        预计交易损益：
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary" }}
                      >
                        +0.04%
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1" sx={{ color: "#bebfc8" }}>
                        veHDT余额：
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary" }}
                      >
                        15k
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1" sx={{ color: "#bebfc8" }}>
                        预计加速：
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary" }}
                      >
                        1.89x
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1" sx={{ color: "#bebfc8" }}>
                        基础奖励收益：
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary" }}
                      >
                        9%
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1" sx={{ color: "#bebfc8" }}>
                        加速后奖励收益：
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary" }}
                      >
                        17.01%
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1" sx={{ color: "#bebfc8" }}>
                        合并收益：
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary" }}
                      >
                        39.01%
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack spacing={2} sx={{ mt: 4 }}>
                    <Button gradient>存款</Button>
                    <Button gradient>
                      <Box>
                        <span>存款</span>
                        <span style={{ fontSize: 12, marginLeft: 6 }}>
                          并存入奖池
                        </span>
                      </Box>
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Card>
    </Container>
  );
};
export default AddPool;

function AddressSelect() {
  return (
    <FormControl fullWidth variant="outlined">
      <Select
        defaultValue={0}
        sx={{
          fontSize: 16,
          color: "white",

          "& .MuiSvgIcon-root": {
            fontSize: 24,
            color: "inherit",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            border: "unset",
          },
        }}
      >
        <MenuItem value={0}>3renUSDCApca</MenuItem>
      </Select>
    </FormControl>
  );
}

const TokenItem: React.FC<{ token: Token }> = ({ token }) => {
  const { icon, name } = token;
  return (
    <Box
      sx={{
        p: 1,
        cursor: "pointer",
        background: "rgba(2, 10, 26, 0.3)",
        borderRadius: "99px",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "2rem",
          height: "2rem",
          borderRadius: '1rem',
          overflow: 'hidden',
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
        <img src={icon} alt="" />
      </Box>

      <Typography sx={{ px: 1, flex: 1, fontSize: 22, lineHeight: "24px" }}>
        {name.toUpperCase()}
      </Typography>
    </Box>
  );
};

const RechargeInput: React.FC<{ token: Token }> = ({ token }) => {
  return (
    <Box
      sx={{
        background: "rgba(2,10,26,0.3)",
        borderRadius: "10px",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 14px",
        }}
      >
        <input
          style={{
            flex: 1,
            marginRight: "12px",
            fontSize: 20,
            lineHeight: "24px",
            border: "unset",
            outline: "unset",
            color: "#FFF",
            background: "transparent",
            appearance: "none",
            minWidth: 120,
          }}
          placeholder="0.0"
        />

        <TokenItem token={token} />
      </Box>
    </Box>
  );
};
