import { Box, Grid } from "@material-ui/core";
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

import Page from "../../pageComponents/Page";
import { SelectToken } from "../Swap";

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
              <Grid item xs={6}>
                <SelectToken coin="btc" coinName="Bitcoin" />
              </Grid>
              <Grid item xs={6}>
                <SelectToken coin="btc" coinName="Bitcoin" />
              </Grid>
              <Grid item xs={12}>
                <Input
                  style={{
                    display: "block",
                    fontSize: 14,
                  }}
                  input={{
                    placeholder: "请输入合约地址",
                  }}
                  before={
                    <TextSM style={{ paddingLeft: ".8rem" }} color="2">
                      流动池合约地址
                    </TextSM>
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 4 }}>
            <TextM color="1">充值数量</TextM>
            <WhiteSpace />
          </Box>
        </Box>
      </Card>
    </Page>
  );
}

export default AddLiquidity;
