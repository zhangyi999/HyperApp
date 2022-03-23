import Web3 from "web3";
import { ContractOptions } from "web3-eth-contract";
import { initContract } from ".";
import abi from "../abis/3Alpaca";
import { TRHEE_ALPACA_CONTRACT } from "../config";

/**
 * 获得输出的代币数量
 *
 * @param provider
 * @param i 输入代币下标
 * @param o 输出代币下标
 * @param dx 输入代币的数量
 * @param wrapped 是否包装
 * @returns
 */
export const getOutputTokenNum = (
  provider: any,
  i: number,
  o: number,
  dx: number,
  wrapped?: boolean
) => {
  return new Promise<string>(async (resolve, reject) => {
    console.log("dx:", dx);

    const contract = initContract(provider, TRHEE_ALPACA_CONTRACT, abi);
    const _dx = Web3.utils.toWei(dx.toString());
    const getDy = wrapped
      ? contract.methods.get_dy(i, o, _dx)
      : contract.methods.get_dy_underlying(i, o, _dx);
    console.log(
      `${wrapped ? "get_dy" : "get_dy_underlying"}(i:${i},j:${o},dx:${_dx})`
    );

    getDy
      .call()
      .then((res: string) => resolve(Web3.utils.fromWei(res)))
      .catch((error: any) => {
        console.error("getOutputTokenNum: -> Error:", error);
        reject(error.message);
      });
  });
};

/**
 * 交易
 *
 * @param provider
 * @param i 输入代币下标
 * @param o 输出代币下标
 * @param dx 输入代币的数量
 * @param min_dy
 * @param wrapped 是否包装
 * @returns
 */
export const exchange = (
  provider: any,
  i: number,
  o: number,
  dx: number,
  min_dy: number,
  wrapped: boolean,
  options: ContractOptions
) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const contract = initContract(provider, TRHEE_ALPACA_CONTRACT, abi);
      const _dx = Web3.utils.toWei(dx.toString());
      const _min_dy = Web3.utils.toWei(min_dy.toString());
      const exchangeFn = wrapped
        ? contract.methods.exchange(i, o, _dx, _min_dy)
        : contract.methods.exchange_underlying(i, o, _dx, _min_dy);
      console.log(
        `${
          wrapped ? "exchange" : "exchange_underlying"
        }(i:${i},j:${o},dx:${_dx},min_dy:${_min_dy})`
      );
      console.log("options:", options);
      exchangeFn
        .send(options)
        .then(resolve)
        .catch((error: any) => {
          console.error("exchange: -> Error:", error);
          reject(error.message);
        });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 *
 * @param provider
 * @param amounts 三个币种的转入数量
 * @param min_mint_amount 根据滑点计算，先填个0吧
 * @param _user_underlying true表示输入为usdt,busd,usdc币种 false表示输入为ibusdt,ibbusd,ibusdc币种
 * @param options
 * @returns
 */
export const addLiquidity = (
  provider: any,
  amounts: string[],
  min_mint_amount: number,
  _user_underlying: boolean,
  options: ContractOptions
) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const contract = initContract(provider, TRHEE_ALPACA_CONTRACT, abi);
      const _amounts = amounts.map((v) => Web3.utils.toWei(v));
      const addLiquidityFn = contract.methods.add_liquidity(
        _amounts,
        min_mint_amount,
        _user_underlying
      );

      console.log(
        `"add_liquidity"
        }(amounts:${_amounts},min_mint_amount:${min_mint_amount},_user_underlying:${_user_underlying})`
      );
      console.log("options:", options);
      addLiquidityFn
        .send(options)
        .then(resolve)
        .catch((error: any) => {
          console.error("addLiquidity: -> Error:", error);
          reject(error.message);
        });
    } catch (error) {
      reject(error);
    }
  });
};
