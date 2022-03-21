export type Token = {
  name: string;
  index: number;
  fullName: string;
  address: string;
  icon: string;
};

const TokenData: Token[] = [
  {
    name: "USDT",
    index: 0,
    fullName: "Tether USD",
    address: "0x81ba747399382a71Cbdb16d740e430f4284DFe17",
    icon: "/coins/USDT.png",
  },
  {
    name: "BUSD",
    index: 1,
    fullName: "Binance USD",
    address: "0x1dC8b36d8651f6eD143C0A1BF7bdF7DD711B57AD",
    icon: "/coins/BUSD.png",
  },
  {
    name: "USDC",
    index: 2,
    fullName: "USDCoin",
    address: "0x9F0067672ef17573f5Ecb6F17fc975000D5e1dcF",
    icon: "/coins/USDC.png",
  },
];

const TokenData_ib: Token[] = [
  {
    name: "ibUSDT",
    index: 0,
    fullName: "ibUSDT",
    address: "0x3D6875FC972aE5bAD1178e4D0cF943651F66D0f1",
    icon: "/coins/USDT.png",
  },
  {
    name: "ibBUSD",
    index: 1,
    fullName: "ibBUSD",
    address: "0xCE6809eE922071AbbA452D7293C33E4a237534A5",
    icon: "/coins/BUSD.png",
  },
  {
    name: "ibUSDC",
    index: 2,
    fullName: "ibUSDC",
    address: "0x03D4a62709cC07D2adA2cde2D165f30Da6255c3A",
    icon: "/coins/USDC.png",
  },
];

// ibUSDT：0x3D6875FC972aE5bAD1178e4D0cF943651F66D0f1
// ibBUSD：0xCE6809eE922071AbbA452D7293C33E4a237534A5
// ibUSDC：0x03D4a62709cC07D2adA2cde2D165f30Da6255c3A

export default TokenData;
export { TokenData_ib, TokenData };
