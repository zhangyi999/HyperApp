import Web3 from "web3";
import { Contract } from "web3-eth-contract";

function getBalance(account: string, library: any) {
  return new Promise(async (resolve, reject) => {
    if (!account) {
      reject("getBalance Error: account is null");
    }
    try {
      const web3 = new Web3(library.provider);
      const balance = await web3.eth.getBalance(account);
      resolve(balance);
    } catch (error) {
      reject(error);
    }
  });
}

export function getContract(abi: any, address: string, library: any) {
  console.log("初始化合约：", address);
  const web3 = new Web3(library.provider);
  let contract = new web3.eth.Contract(abi, address);
  return contract;
}

function wei2ETH(wei: string) {
  if (!wei) return "0";
  return Web3.utils.fromWei(wei, "ether");
}

function weiFromETH(eth: string) {
  if (!eth) return "0";
  return Web3.utils.toWei(eth, "ether");
}

//导出相应的方法
export default {
  getBalance,
  wei2ETH,
  weiFromETH,
};
