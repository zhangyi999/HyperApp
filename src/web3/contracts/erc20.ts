import Web3 from "web3";
import { initContract } from ".";
import abi from "../abis/erc20";

export const getTokenBalance = async (
  provider: any,
  tokenAddress: string,
  account: string
) => {
  return new Promise<any>(async (resolve, reject) => {
    const contract = initContract(provider, tokenAddress, abi);

    contract.methods
      .balanceOf(account)
      .call()
      .then((wei: any) => resolve(Web3.utils.fromWei(wei, "ether")))
      .catch((error: any) => {
        console.error("getTokenBalance: -> Error:", error);
        reject(error);
      });
  });
};

export const allowance = async (
  provider: any,
  tokenAddress: string,
  owner: string,
  spender: string
) => {
  return new Promise<string>(async (resolve, reject) => {
    const contract = initContract(provider, tokenAddress, abi);

    console.log(`allowance(owner:${owner}, spender${spender})`);
    contract.methods
      .allowance(owner, spender)
      .call()
      .then((value: string) => resolve(Web3.utils.fromWei(value)))
      .catch((error: any) => {
        console.error("allowance: -> Error:", error);
        reject(error);
      });
  });
};

export const approve = async (
  provider: any,
  tokenAddress: string,
  spender: string,
  value: string
) => {
  return new Promise<any>(async (resolve, reject) => {
    const contract = initContract(provider, tokenAddress, abi);

    console.log(
      `approve(spender:${spender}, value:${Web3.utils.toWei(value)})`
    );
    contract.methods
      .approve(spender, Web3.utils.toWei(value))
      .send()
      .then(resolve)
      .catch((error: any) => {
        console.error("approve: -> Error:", error);
        reject(error);
      });
  });
};
