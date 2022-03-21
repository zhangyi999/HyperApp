const DEV = process.env.NODE_ENV === "development";

const TRHEE_ALPACA_CONTRACT = "0x0cFC44D0Cc82bc7fD551AeD126AC8E575289311F";
// const BSC_CHAIN_ID = DEV ? 97 : 56;
// const SUPPORT_NETWORKS = DEV ? [97] : [56];
const BSC_CHAIN_ID = 97;
const SUPPORT_NETWORKS = [97];

const RPC_URLS: { [chainId: number]: string } = {
  56: "https://bsc-dataseed.binance.org/",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545",
};

export { TRHEE_ALPACA_CONTRACT, BSC_CHAIN_ID, SUPPORT_NETWORKS, RPC_URLS };
