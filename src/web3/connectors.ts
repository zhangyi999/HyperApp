import { BSC_CHAIN_ID, RPC_URLS, SUPPORT_NETWORKS } from "./config";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export enum ConnectorNames {
  Metamask = "Metamask",
  WalletConnect = "WalletConnect",
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORT_NETWORKS,
});

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  chainId: BSC_CHAIN_ID,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const connectorsByName: {
  [connectorName in ConnectorNames]: any;
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
