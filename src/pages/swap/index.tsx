import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../../components/Card";
import Text from "../../components/Text";
import { TokenSelect } from "../../components/TokenSelect";
import { useSetting } from "../../contexts/setting";
import TokenData, { Token, TokenData_ib } from "../../data/token";
import useDebounce from "../../hooks/useDebounce";
import useToast from "../../hooks/useToast";
import { numberFromString } from "../../utils/number";
import { TRHEE_ALPACA_CONTRACT } from "../../web3/config";
import { getOutputTokenNum, exchange } from "../../web3/contracts/3alpaca";
import {
  allowance,
  approve,
  getTokenBalance,
} from "../../web3/contracts/erc20";
import FormInput from "./components/FormInput";
import FormSwitch from "./components/FormSwitch";
import SwapButton from "./components/SwapButton";
import TransformButton from "./components/TransformButton";

const Swap: React.FC = () => {
  const { library, account } = useWeb3React();
  const { setting, setSetting } = useSetting();
  const toast = useToast();
  const [from, setFrom] = useState<Token | undefined>(TokenData_ib[0]);
  const [to, setTo] = useState<Token | undefined>();
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState<number>();
  const [fromBalance, setFromBalance] = useState("");
  const [wrapped, setWrapped] = useState(false);
  const [swaping, setSwaping] = useState(false);
  const [swapText, setSwapText] = useState("兑换");

  const [tokens, setTokens] = useState(TokenData);

  useEffect(() => {
    if (wrapped) {
      setTokens(TokenData_ib);
      setFrom(TokenData_ib[0]);
      setTo(undefined);
    } else {
      setFrom(TokenData[0]);
      setTokens(TokenData);
      setTo(undefined);
      setToValue(undefined);
    }
  }, [wrapped]);

  const [config, setConfig] = useState({
    exchangeRatio: 9.9,
    maxSlippage: 0.1,
    exchangeRoute: "3Apaca",
  });

  const error = useMemo(() => {
    if (!from || !to) return "请选择代币";
    if (!fromValue) return "请输入";
    if (parseFloat(fromBalance) < parseFloat(fromValue)) return "余额不足";
    return undefined;
  }, [from, fromBalance, fromValue, to]);

  // 监听代币变化，获取余额
  useEffect(() => {
    if (from && library && account) {
      getTokenBalance(library.provider, from.address, account).then((res) => {
        console.log(from.name + "余额：", res);
        setFromBalance(res);
      });
    } else {
      setFromBalance("");
    }
  }, [account, from, library]);

  const getOutputTokenNumDebounce = useDebounce(
    () => {
      if (from && to && fromValue && library) {
        getOutputTokenNum(
          library.provider,
          from.index,
          to.index,
          parseFloat(fromValue),
          wrapped
        ).then((res) => {
          setToValue(numberFromString(res, 2));
        });
      } else {
        setToValue(undefined);
      }
    },
    300,
    [account, to, library, from, fromValue, wrapped]
  );

  // 监听代币及兑换数量变化，获取可兑换数量
  useEffect(() => {
    getOutputTokenNumDebounce();
  }, [getOutputTokenNumDebounce]);

  // 代币转换
  const handleTransform = useCallback(() => {
    let _tempFrom = from ? { ...from } : undefined;
    let _tempTo = to ? { ...to } : undefined;
    setFrom(_tempTo);
    setTo(_tempFrom);
  }, [from, to]);

  const handleFromTokenChange = useCallback(
    (token: Token) => {
      if (to && to.name === token.name) {
        handleTransform();
      } else {
        setFrom(token);
      }
    },
    [handleTransform, to]
  );

  const handleToTokenChange = useCallback(
    (token: Token) => {
      if (from && from.name === token.name) {
        handleTransform();
      } else {
        setTo(token);
      }
    },
    [handleTransform, from]
  );

  const handleExchange = useCallback(() => {
    if (from && to && fromValue && toValue && library) {
      const min_dy = toValue * (1 - setting.userSlippageTolerance / 100);
      const exChangeFn = exchange(
        library.provider,
        from.index,
        to.index,
        parseFloat(fromValue),
        min_dy,
        wrapped
      );
      exChangeFn
        .then((res) => {
          console.log(res);
          toast.success("swap successful");
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setSwaping(false);
          setSwapText("兑换");
        });
    }
  }, [
    from,
    fromValue,
    library,
    setting.userSlippageTolerance,
    to,
    toValue,
    toast,
    wrapped,
  ]);

  const handleApprove = useCallback(async () => {
    try {
      if (library && from && account) {
        setSwapText("正在授权");
        const allowanceValue = await allowance(
          library.provider,
          from.address,
          account,
          TRHEE_ALPACA_CONTRACT
        );

        console.log("allowanceValue:", allowanceValue);
        console.log("fromValue:", fromValue);
        if (parseFloat(allowanceValue) >= parseFloat(fromValue)) {
          return Promise.resolve(true);
        } else {
          const flag = await approve(
            library.provider,
            from.address,
            TRHEE_ALPACA_CONTRACT,
            fromValue
          );
          console.log("approve:", flag);
          return Promise.resolve(flag);
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }, [account, from, fromValue, library]);

  const handleSwap = useCallback(async () => {
    setSwaping(true);
    try {
      // 用户开启了无限授权，直接交易
      if (setting.userSwapApproveUnlimited) {
        setSwapText("正在兑换");
        handleExchange();
      } else {
        // 用户未开启无限授权，检查授权

        if (await handleApprove()) {
          setSwapText("正在兑换");
          handleExchange();
        }
      }
    } catch (error) {
      setSwaping(false);
      toast.error(error as string);
    }
  }, [handleApprove, handleExchange, setting.userSwapApproveUnlimited, toast]);

  return (
    <Container
      sx={{
        py: 2,
      }}
    >
      <Card maxWidth={450}>
        <Box>
          <Text>From</Text>
          <TokenSelect
            token={from}
            tokens={tokens}
            onChange={handleFromTokenChange}
          />
          <FormInput
            label="兑换数量"
            value={fromValue}
            onChange={setFromValue}
            inputProps={{
              placeholder: "0.0",
              // onBlur(e) {
              //   setFromValue(numberFromString(e.target.value));
              // },
            }}
          />
        </Box>
        <TransformButton onClick={handleTransform} />
        <Box>
          <Text>To</Text>
          <TokenSelect
            token={to}
            tokens={tokens}
            onChange={handleToTokenChange}
          />
          <FormInput
            label="可兑换"
            value={(toValue || 0).toFixed(2)}
            inputProps={{ placeholder: "0.0", readOnly: true }}
          />
        </Box>
        <Divider sx={{ my: 2, borderStyle: "dashed" }} />
        <Box>
          <FormSwitch
            checked={wrapped}
            onChange={setWrapped}
            label="Swap wrapped"
          />
          <FormSwitch
            label="无限授权"
            checked={setting.userSwapApproveUnlimited}
            onChange={(checked) => {
              setSetting({ userSwapApproveUnlimited: checked });
            }}
          />
        </Box>
        <Box>
          <Stack direction="row" spacing={3}>
            <Typography variant="subtitle2" sx={{ color: "#bebfc8" }}>
              兑换比例
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {config.exchangeRatio}%
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Typography variant="subtitle2" sx={{ color: "#bebfc8" }}>
              最高滑点
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {setting.userSlippageTolerance}%
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Typography variant="subtitle2" sx={{ color: "#bebfc8" }}>
              兑换路由
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {config.exchangeRoute}
            </Typography>
          </Stack>
        </Box>

        <SwapButton
          loading={swaping}
          text={swapText}
          error={error}
          onSwap={handleSwap}
        />
      </Card>
    </Container>
  );
};
export default Swap;
