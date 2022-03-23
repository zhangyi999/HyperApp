import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  Container,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../components/Card";
import Text from "../../components/Text";
import { TabContext, TabList } from "@mui/lab";
import FormItem from "../../components/FormItem";
import { TokenSelect } from "../../components/TokenSelect";
import TokenData, { Token, TokenData_ib } from "../../data/token";
import Button from "../../components/Button";
import {
  allowance,
  approve,
  getTokenBalance,
} from "../../web3/contracts/erc20";
import { useWeb3React } from "@web3-react/core";
import FormSwitch from "../swap/components/FormSwitch";
import useToast from "../../hooks/useToast";
import { TRHEE_ALPACA_CONTRACT } from "../../web3/config";
import { addLiquidity } from "../../web3/contracts/3alpaca";
import TaskProcess, { Task, TaskStatus } from "./components/TaskProcess";

type RechargeToken = {
  balance?: string;
  rechargeValue?: string;
} & Token;

const AddPool: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const { library, account } = useWeb3React();
  const [currentTab, setCurrentTab] = useState("0");
  const [underlying, setUnderlying] = useState(true);

  const tokens = useMemo(
    () => (underlying ? TokenData : TokenData_ib),
    [underlying]
  );
  const [currencyPairs1, setCurrencyPairs1] = useState(tokens[0]);
  const [currencyPairs2, setCurrencyPairs2] = useState(tokens[1]);

  useEffect(() => {
    if (underlying) {
      setCurrencyPairs1(TokenData[0]);
      setCurrencyPairs2(TokenData[1]);
    } else {
      setCurrencyPairs1(TokenData_ib[0]);
      setCurrencyPairs2(TokenData_ib[1]);
    }
  }, [underlying]);

  const [rechargeTokens, setRechargeTokens] = useState<RechargeToken[]>(
    underlying ? [...TokenData] : [...TokenData_ib]
  );

  const [task, setTask] = useState<{
    show: boolean;
    name: string;
    status: TaskStatus;
  }>({
    show: false,
    name: "",
    status: "normal",
  });
  const [subTask, setSubTask] = useState<Task[]>([]);

  const initTask = () => {
    setTask({ show: false, name: "", status: "normal" });
    setSubTask([]);
  };

  // 监听代币变化，获取余额
  useEffect(() => {
    if (library && account) {
      const currentTokens: RechargeToken[] = underlying
        ? [...TokenData]
        : [...TokenData_ib];

      setRechargeTokens(currentTokens);
      const pmsArr = currentTokens.map((token) =>
        getTokenBalance(library.provider, token.address, account)
      );
      const pms = Promise.all<Promise<string>>(pmsArr);
      pms.then((balanceArr) => {
        console.log("余额：", balanceArr);
        balanceArr.forEach((b, i) => {
          currentTokens[i].balance = b;
          setRechargeTokens([...currentTokens]);
        });
      });
    }
  }, [account, library, underlying]);

  const rechargeValueChange = useCallback((value: string, index: number) => {
    setRechargeTokens((prev) => {
      prev[index].rechargeValue = value;
      return [...prev];
    });
  }, []);

  /**
   * 验证充值数额的有效性
   */
  const validateInput = useCallback(async () => {
    for (let i = 0; i < rechargeTokens.length; i++) {
      const token = rechargeTokens[i];
      if (!token.rechargeValue) {
        return Promise.reject(`请输入${token.name}充值数额`);
      }
      if (isNaN(parseFloat(token.rechargeValue))) {
        return Promise.reject(`请输入有效数字，错误值：${token.rechargeValue}`);
      }
    }

    return Promise.resolve();
  }, [rechargeTokens]);

  /**
   * 授权代币
   */
  const approveToken = useCallback(
    async (token: RechargeToken) => {
      try {
        if (account && library) {
          const allowanceValue = await allowance(
            library.provider,
            token.address,
            account,
            TRHEE_ALPACA_CONTRACT
          );

          if (
            parseFloat(allowanceValue) >=
            parseFloat(token.rechargeValue as string)
          ) {
            setSubTask((prev) => {
              const _new = [...prev];
              _new.push({
                name: "checking " + token.name + " allowance",
                status: "success",
              });
              return _new;
            });
            return Promise.resolve(true);
          } else {
            setSubTask((prev) => {
              const _new = [...prev];
              _new.push({
                name: "checking " + token.name + " allowance",
                status: "fail",
              });
              return _new;
            });
            setSubTask((prev) => {
              const _new = [...prev];
              _new.push({
                name: "checking " + token.name + " approve",
                status: "loading",
              });
              return _new;
            });
            const flag = await approve(
              library.provider,
              token.address,
              TRHEE_ALPACA_CONTRACT,
              token.rechargeValue as string,
              { from: account }
            );

            setSubTask((prev) => {
              const _new = [...prev];
              _new[_new.length - 1] = {
                ..._new[_new.length - 1],
                status: flag ? "success" : "fail",
              };

              return _new;
            });
            console.log(token.name + " approve:", flag);
            return Promise.resolve(flag);
          }
        }
      } catch (error) {
        setSubTask((prev) => {
          const _new = [...prev];
          _new[_new.length - 1] = {
            ..._new[_new.length - 1],
            status: "fail",
          };

          return _new;
        });
        return Promise.reject(error);
      }
    },
    [account, library]
  );

  /**
   * 授权所有代币
   */
  const approveAllToken = useCallback(async () => {
    try {
      const len = rechargeTokens.length;
      for (let i = 0; i < len; i++) {
        const token = rechargeTokens[i];
        setTask((prev) => ({
          ...prev,
          name: `checking approve(${i + 1}/${len})`,
        }));

        await approveToken(token);
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }, [approveToken, rechargeTokens]);

  /**
   * 添加流动性
   */
  const handleAddLiquidity = useCallback(async () => {
    try {
      if (account && library) {
        setTask((prev) => ({
          ...prev,
          name: "add liquidity",
        }));

        setSubTask((prev) => {
          const _new = [...prev];
          _new.push({
            name: "add liquidity",
            status: "loading",
          });
          return _new;
        });
        const amounts = rechargeTokens.map(
          (item) => item.rechargeValue as string
        );
        const res = await addLiquidity(
          library.provider,
          amounts,
          0,
          underlying,
          {
            from: account,
          }
        );

        setTask((prev) => ({
          ...prev,
          status: "success",
        }));

        setSubTask((prev) => {
          const _new = [...prev];
          _new[_new.length - 1] = {
            ..._new[_new.length - 1],
            status: "success",
          };
          return _new;
        });
        return Promise.resolve(res);
      } else {
        setTask((prev) => ({
          ...prev,
          status: "fail",
        }));
        return Promise.reject("please connect you wallet");
      }
    } catch (error) {
      return Promise.reject(error as string);
    }
  }, [account, library, rechargeTokens, underlying]);

  /**
   * 存款
   */
  const handleDeposit = useCallback(async () => {
    try {
      initTask();
      await validateInput();
      setTask({
        show: true,
        name: "Checking approves",
        status: "loading",
      });

      await approveAllToken();

      await handleAddLiquidity();
      toast.success("add liquidity successful!");
    } catch (error) {
      toast.error(error as string, {
        autoHideDuration: 5000,
      });
      setSubTask((prev) => {
        const _new = [...prev];
        _new[_new.length - 1] = {
          ..._new[_new.length - 1],
          status: "fail",
        };
        return _new;
      });

      setTask((prev) => ({
        ...prev,
        status: "fail",
      }));
    }
  }, [validateInput, approveAllToken, handleAddLiquidity, toast]);

  return (
    <Container sx={{ maxWidth: "800px !important", py: 2 }}>
      <TaskProcess
        name={task.name}
        show={task.show}
        status={task.status}
        subTask={subTask}
        onClose={initTask}
      />
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
                      tokens={tokens}
                      token={currencyPairs1}
                      onChange={setCurrencyPairs1}
                      sx={{ backgroundColor: "transparent" }}
                    />
                  </FormItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormItem label="流动性代币">
                    <TokenSelect
                      tokens={tokens}
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
                {rechargeTokens.map((token, index) => {
                  return (
                    <RechargeInput
                      key={index}
                      token={token}
                      onChange={(v) => rechargeValueChange(v, index)}
                    />
                  );
                })}
                <Box>
                  <FormSwitch
                    checked={underlying}
                    onChange={setUnderlying}
                    label="user underlying"
                  />
                </Box>
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
                    <Button
                      gradient
                      disabled={task.status === "loading"}
                      onClick={handleDeposit}
                    >
                      存款
                    </Button>
                    <Button gradient disabled={task.status === "loading"}>
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
          width: "1.6rem",
          height: "1.6rem",
          borderRadius: "0.8rem",
          overflow: "hidden",
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

      <Typography sx={{ px: 1, flex: 1, fontSize: 18, lineHeight: "22px" }}>
        {name.toUpperCase()}
      </Typography>
    </Box>
  );
};

const RechargeInput: React.FC<{
  token: RechargeToken;
  onChange: (value: string) => void;
}> = ({ token, onChange }) => {
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
          alignItems: "start",
          padding: "10px 14px 5px",
        }}
      >
        <input
          style={{
            flex: 1,
            marginRight: "12px",
            fontSize: 24,
            lineHeight: "42px",
            border: "unset",
            outline: "unset",
            color: "#FFF",
            background: "transparent",
            appearance: "none",
            minWidth: 120,
          }}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
        />

        <Box
          sx={{
            textAlign: "right",
          }}
        >
          <TokenItem token={token} />
          <Typography
            sx={{ pt: 0.5, display: "block", px: 1 }}
            variant="caption"
          >
            余额:{token.balance || "0.0"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
