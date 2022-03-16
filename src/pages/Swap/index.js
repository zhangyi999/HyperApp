import { Box } from "@material-ui/core";
import { useState } from "react";
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
} from "../../components";
import FormItem from "../../components/FormItem";
import { TokenSelect } from "../../components/TokenSelect";

import PageBlock from "../../pageComponents/PageBlock";

const ButtonBlock = styled.div`
  background: rgba(75, 36, 103, 0.66);
  width: 65px;
  margin-left: calc(100% - 65px + 20px);
  border-radius: 100px 0px 0px 100px;
  padding: 0.5rem;
  text-align: center;
  ${Icon} {
    display: block;
    margin: auto;
  }
`;
function SetButton() {
  return (
    <ButtonBlock>
      <Icon color="#aa91f9" size="20" type="icon-shezhi1" />
    </ButtonBlock>
  );
}

const SelectBlock = styled.div`
  padding: 1.2rem 0.8rem;
  background: rgba(2, 10, 26, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
  /* just */
  ${(p) => p.style}
`;
export function SelectToken({ coin, coinName, wrapStyle }) {
  return (
    <SelectBlock style={wrapStyle}>
      <Coin
        size="32"
        style={{
          border: "2px solid rgba(0,0,0,0.3)",
          borderRadius: "100px",
        }}
        type={coin}
      />
      <TextMD style={{ paddingLeft: ".6rem" }}>
        {coinName} <TextSM color="2">{coin.toUpperCase()}</TextSM>
      </TextMD>
      {/* </div> */}

      <Icon
        type="icon-arrow-down"
        size="16"
        style={{
          position: "absolute",
          right: "10px",
          // marginLeft: 'calc(100% - 20px)'
        }}
      />
    </SelectBlock>
  );
}

const ExChangeIcon = styled(Icon)`
  margin: auto;
  display: block;
  color: #4d296e;
  background: #fff;
  border-radius: 100px;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0px 0px 6px rgb(255 255 255);
`;

function Swap() {
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState();

  return (
    <PageBlock>
      <Card
        b="1"
        // w='80'
        style={{
          maxWidth: "450px",
          margin: "auto",
        }}
      >
        <SetButton />
        <TextM color="1">From</TextM>
        <WhiteSpace />
        <TokenSelect coin="btc" coinName="Bitcoin" />
        <WhiteSpace />
        <FormItem label="兑换数量">
          <Box
            sx={{
              padding: "8px 14px",
            }}
          >
            <input
              style={{
                fontSize: 16,
                lineHeight: "24px",
                border: "unset",
                outline: "unset",
                color: "#FFF",
                background: "transparent",
                appearance: "none",
                width: "100%",
              }}
            />
          </Box>
        </FormItem>
        <WhiteSpace size="1" />
        <ExChangeIcon type="icon-duihuan1" size="32" />
        <TextM color="1">To</TextM>
        <WhiteSpace />
        <TokenSelect coin="btc" coinName="Bitcoin" />
        <WhiteSpace />

        <FormItem label="可兑换">
          <Box
            sx={{
              padding: "8px 14px",
            }}
          >
            <input
              style={{
                fontSize: 16,
                lineHeight: "24px",
                border: "unset",
                outline: "unset",
                color: "#FFF",
                background: "transparent",
                appearance: "none",
                width: "100%",
              }}
            />
          </Box>
        </FormItem>
        <WhiteSpace />
        <HrDotted />
        <WhiteSpace />

        <TextSM color="2">兑换比例</TextSM>
        <WingBlank size="2" />
        <TextSM color="1">123123</TextSM>
        <br />

        <TextSM color="2">最高滑点</TextSM>
        <WingBlank size="2" />
        <TextSM color="1">123123</TextSM>
        <br />

        <TextSM color="2">兑换路由</TextSM>
        <WingBlank size="2" />
        <TextSM color="1">123123</TextSM>
        <WhiteSpace size="1" />

        <Button w="100" size="1">
          兑换
        </Button>
      </Card>
    </PageBlock>
  );
}

export default Swap;
