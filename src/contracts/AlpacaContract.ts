import config from "./config";
import { Contract, ContractOptions } from "web3-eth-contract";
import {
  CONTRACT_INIT_ERROR,
  errorHandler,
  RejectContractError,
} from "./helper";
import Web3 from "web3";

export type ApproveParams = {
  tokenId: number | string;
  options: any;
  onTransactionHash?: (hash?: string) => void;
};

export type ApproveAllParams = {
  operatorAddress?: string;
  approve?: boolean;
  options?: any;
  onTransactionHash?: () => void;
};

export type NFTVoucher = {
  tokenId: number;
  minPrice: number | string;
  creator: string; // 创作者
  publisher: string; // 发行商
  ratio: number; // 发行商的分成比例, 分母为 10000
  uri: string;
  signature: string;
};

export type RedeemParams = {
  redeemer: string;
  voucher: NFTVoucher;
  options: any;
  onTransactionHash?: (txHash: string) => void;
};

export default class AlpacaContract {
  contract?: Contract;

  constructor(library: any) {
    console.log("初始化3AlpacaContract：", config.AlpacaContractAddress);
    console.log("初始化3AlpacaContract：library", library);

    const web3 = new Web3(library.provider);
    let contract = new web3.eth.Contract(
      config.AlpacaContractAbi as any,
      config.AlpacaContractAddress
    );
    console.log("初始化3AlpacaContract 完成：", contract);
    this.contract = contract;
  }

  /**
   * 授权Market合约操作指定的NFT
   *
   */
  approve(params: ApproveParams) {
    console.log("approve params:", params);

    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      if (!this.contract) {
        reject(CONTRACT_INIT_ERROR);
      }

      const approveFn = (this.contract as Contract).methods.approve(
        config.MarketContractAddress,
        params.tokenId
      );

      approveFn
        .estimateGas(params.options)
        .then((gas: any) => {
          console.log("[AlpacaContract] approve: -> estimateGas = ", gas);
          const options: ContractOptions = {
            ...params.options,
            gas: Math.round(gas * 1.1),
          };
          approveFn
            .send(options)
            // 用户在metamask中点击确认会触发此事件，返回当前交易Hash
            .on("transactionHash", function (hash: any) {
              params.onTransactionHash && params.onTransactionHash();
            })
            .then(resolve)
            .catch((error: any) => {
              console.error("[AlpacaContract] approve: -> Error:", error);
              reject(errorHandler(error));
            });
        })
        .catch((error: any) => {
          console.error("[AlpacaContract] approve: -> Error:", error);
          reject(errorHandler(error));
        });
    });
  }

  /**
   * 第一次购买NFT
   *
   * @param price
   * @param redeemer
   * @param voucher
   * @returns
   */
  redeem(params: RedeemParams) {
    console.log("redeem params:", params);
    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      if (this.contract) {
        console.log(this.contract);

        const redeemFn = (this.contract as Contract).methods.redeem(
          params.redeemer,
          params.voucher
        );

        redeemFn
          .estimateGas(params.options)
          .then((gas: any) => {
            console.log("[AlpacaContract] redeem: -> estimateGas = ", gas);
            const options: ContractOptions = {
              ...params.options,
              gas: Math.round(gas * 1.1),
            };
            redeemFn
              .send(options)
              // 用户在metamask中点击确认会触发此事件，返回当前交易Hash
              .on("transactionHash", function (hash: any) {
                params.onTransactionHash && params.onTransactionHash(hash);
              })
              .then(resolve)
              .catch((error: any) => {
                console.error("[AlpacaContract] redeem: -> Error:", error);
                reject(errorHandler(error));
              });
          })
          .catch((error: any) => {
            console.error(
              "[AlpacaContract] redeem: -> estimateGas Error:",
              error
            );
            reject(errorHandler(error));
          });
      } else {
        reject(CONTRACT_INIT_ERROR);
      }
    });
  }

  /**
   * 授权Market合约操作所有的NFT
   *
   */
  setApprovalForAll(params: ApproveAllParams) {
    console.log("setApprovalForAll params:", params);

    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      if (!this.contract) {
        reject(CONTRACT_INIT_ERROR);
      }

      const setApprovalForAllFn = (
        this.contract as Contract
      ).methods.setApprovalForAll(
        params.operatorAddress || config.MarketContractAddress,
        true
      );

      setApprovalForAllFn
        .estimateGas(params.options)
        .then((gas: any) => {
          console.log(
            "[AlpacaContract] setApprovalForAll: -> estimateGas = ",
            gas
          );
          const options: ContractOptions = {
            ...params.options,
            gas: Math.round(gas * 1.1),
          };
          setApprovalForAllFn
            .send(options)
            // 用户在metamask中点击确认会触发此事件，返回当前交易Hash
            .on("transactionHash", function () {
              params.onTransactionHash && params.onTransactionHash();
            })
            .then(resolve)
            .catch((error: any) => {
              console.error(
                "[AlpacaContract] setApprovalForAll: -> Error:",
                error
              );
              reject(errorHandler(error));
            });
        })
        .catch((error: any) => {
          console.error(
            "[AlpacaContract] setApprovalForAll: -> estimateGas Error:",
            error
          );
          reject(errorHandler(error));
        });
    });
  }

  getApproved(tokenId: string) {
    console.log("getApproved tokenId:", tokenId);

    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      if (!this.contract) {
        reject(CONTRACT_INIT_ERROR);
      }

      (this.contract as Contract).methods
        .getApproved(tokenId)
        .call()
        .then(resolve)
        .catch((error: any) => {
          console.error("[AlpacaContract] getApproved: -> Error:", error);
          reject(errorHandler(error));
        });
    });
  }

  isApprovedForAll(
    ownerAddress: string,
    operatorAddress = config.MarketContractAddress
  ) {
    console.log(
      "isApprovedForAll ownerAddress:",
      ownerAddress,
      "\toperatorAddress:",
      operatorAddress
    );

    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      if (!this.contract) {
        reject(CONTRACT_INIT_ERROR);
      }

      (this.contract as Contract).methods
        .isApprovedForAll(ownerAddress, operatorAddress)
        .call()
        .then(resolve)
        .catch((error: any) => {
          console.error("[AlpacaContract] isApprovedForAll: -> Error:", error);
          reject(errorHandler(error));
        });
    });
  }
}
