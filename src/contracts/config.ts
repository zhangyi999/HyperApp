import MarketContractAbi from "./abis/market";
import LazyNFTContractAbi from "./abis/lazyNFT";
import erc20Abi from "./abis/erc20";

export const LazyNFTContractAddress = process.env
  .NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string;
export const MarketContractAddress = process.env
  .NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS as string;

console.log("LazyNFTContractAddress:", LazyNFTContractAddress);
console.log("MarketContractAddress:", MarketContractAddress);

export default {
  AlpacaContractAddress: "0x3CC42Ae9e47Ac75FEb46633F2Ab57942384C1aC7",
  AlpacaContractAbi: erc20Abi,
  // // 智能合约地址
  LazyNFTContractAddress,
  MarketContractAddress,
  // 智能合约ABI
  MarketContractAbi,
  LazyNFTContractAbi,
};
