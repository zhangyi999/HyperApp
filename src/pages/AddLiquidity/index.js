import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";

import {
  Card,
  Icon,
  TextM,
  TextSM,
  TextMD,
  Input,
  WhiteSpace,
  Coin,
  HrDotted,
  WingBlank,
  Button,
  Table,
  HeadBlock,
  RowBlock,
  Fragment,
} from "../../components";
import FormItem from "../../components/FormItem";
import { TokenSelect } from "../../components/TokenSelect";

import Page from "../../pageComponents/Page";

function AddLiquidity() {
  return (
    <Page title="添加流动性">
      <Card
        b="1"
        // w='80'
      >
        <Box
          sx={{
            maxWidth: 668,
            mx: "auto",
            py: 1,
          }}
        >
          <Box>
            <TextM color="1">检索币对</TextM>
            <WhiteSpace />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormItem label="代币">
                  <TokenSelect
                    wrapStyle={{
                      background: "transparent",
                      padding: "10px 14px ",
                    }}
                    coin="btc"
                    coinName="Bitcoin"
                  />
                </FormItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormItem label="流动性代币">
                  <TokenSelect
                    wrapStyle={{
                      background: "transparent",
                      padding: "10px 14px ",
                    }}
                    coin="btc"
                    coinName="Bitcoin"
                  />
                </FormItem>
              </Grid>
              <Grid item xs={12}>
                <FormItem label="流动池合约地址">
                  <AddressSelect />
                </FormItem>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 4 }}>
            <TextM color="1">充值数额</TextM>
            <WhiteSpace />
            <Group>
              <Grid container rowSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormItem
                    wrapStyle={{
                      background: "transparent",
                    }}
                    label="充值币种"
                  >
                    <TokenSelect
                      wrapStyle={{
                        background: "transparent",
                        padding: "10px 14px ",
                      }}
                      coin="btc"
                      coinName="Bitcoin"
                    />
                  </FormItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormItem
                    wrapStyle={{
                      background: "transparent",
                    }}
                    label="充值数额"
                  >
                    <RechargeInput />
                  </FormItem>
                </Grid>
              </Grid>
            </Group>
            <Group>
              <Grid container rowSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormItem
                    wrapStyle={{
                      background: "transparent",
                    }}
                    label="充值币种"
                  >
                    <TokenSelect
                      wrapStyle={{
                        background: "transparent",
                        padding: "10px 14px ",
                      }}
                      coin="btc"
                      coinName="Bitcoin"
                    />
                  </FormItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormItem
                    wrapStyle={{
                      background: "transparent",
                    }}
                    label="充值数额"
                  >
                    <RechargeInput />
                  </FormItem>
                </Grid>
              </Grid>
            </Group>
            <Group>
              <Grid container rowSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormItem
                    wrapStyle={{
                      background: "transparent",
                    }}
                    label="充值币种"
                  >
                    <TokenSelect
                      wrapStyle={{
                        background: "transparent",
                        padding: "10px 14px ",
                      }}
                      coin="btc"
                      coinName="Bitcoin"
                    />
                  </FormItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormItem
                    wrapStyle={{
                      background: "transparent",
                    }}
                    label="充值数额"
                  >
                    <RechargeInput />
                  </FormItem>
                </Grid>
              </Grid>
            </Group>
            <Group>
              <Grid container rowSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormItem
                    wrapStyle={{
                      background: "transparent",
                    }}
                    label="充值币种"
                  >
                    <TokenSelect
                      wrapStyle={{
                        background: "transparent",
                        padding: "10px 14px ",
                      }}
                      coin="btc"
                      coinName="Bitcoin"
                    />
                  </FormItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormItem
                    wrapStyle={{
                      background: "transparent",
                    }}
                    label="充值数额"
                  >
                    <RechargeInput />
                  </FormItem>
                </Grid>
              </Grid>
            </Group>
          </Box>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            <Button size="1" style={{ minWidth: 200 }}>
              存款
            </Button>
            <Button size="1" style={{ minWidth: 200 }}>
              <Box>
                <span>存款</span>
                <span style={{ fontSize: 12, marginLeft: 6 }}>并存入奖池</span>
              </Box>
            </Button>
          </Box>
        </Box>
      </Card>
    </Page>
  );
}

export default AddLiquidity;

const useStyle = makeStyles({
  root: {
    fontSize: 16,
    color: "white",
    marginBottom: 6,

    "& .MuiSvgIcon-root": {
      fontSize: 24,
      color: "inherit",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "unset",
    },
  },
});

function AddressSelect() {
  const classes = useStyle();
  return (
    <FormControl size="small" fullWidth variant="outlined">
      <Select defaultValue={0} className={classes.root}>
        <MenuItem value={0}>3renUSDCApca</MenuItem>
      </Select>
    </FormControl>
  );
}

function Group({ children }) {
  return (
    <Box
      sx={{
        background: "rgba(2,10,26,0.3)",
        borderRadius: 10,
        mb: 2,
      }}
    >
      {children}
    </Box>
  );
}

function RechargeInput() {
  return (
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
          fontSize: 16,
          lineHeight: "24px",
          border: "unset",
          outline: "unset",
          color: "#FFF",
          background: "transparent",
          appearance: "none",
          minWidth: 120,
        }}
        type="tel"
        placeholder="请输入充值数额"
      />

      <Button size="0" style={{ minWidth: "64px" }}>
        Max
      </Button>
    </Box>
  );
}
