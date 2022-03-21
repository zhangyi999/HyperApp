import Web3 from "web3";
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
    console.log('dx:',dx);
    
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
        reject(error);
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
  wrapped?: boolean
) => {
  return new Promise<any>(async (resolve, reject) => {
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
    exchangeFn
      .send()
      .then(resolve)
      .catch((error: any) => {
        console.error("exchange: -> Error:", error);
        reject(error);
      });
  });
};
