import { IRPCMap } from "@walletconnect/types";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";

export enum ConnectorNames {
  Metamask = "Metamask",
  WalletConnect = "WalletConnect",
}

const RPC_URLS: IRPCMap = {
  56: process.env.NEXT_PUBLIC_RPC_URL_56 as string,
  97: process.env.NEXT_PUBLIC_RPC_URL_97 as string,
};

export const chainId = process.env.NEXT_PUBLIC_BSC_CHAIN_ID as string;

export const injected = new InjectedConnector({
  supportedChainIds: [56, 97],
});

export const walletconnect = new WalletConnectConnector({
  qrcode: true,
  infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
  rpc: RPC_URLS,
  chainId: parseInt(chainId),
  supportedChainIds: [56, 97],
});

export const connectorsByName: {
  [connectorName in ConnectorNames]: AbstractConnector;
} = {
  [ConnectorNames.Metamask]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

export const cacheConnector = (connectorName: ConnectorNames) => {
  localStorage.setItem("connector", connectorName);
};

export const getCachedConnector = () => {
  const res = localStorage.getItem("connector");

  if (res && Object.keys(ConnectorNames).includes(res)) {
    return res as ConnectorNames;
  }
  return null;
};

export const removeConnector = () => {
  localStorage.removeItem("connector");
};
