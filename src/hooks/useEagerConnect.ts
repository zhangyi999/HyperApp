import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import {
  ConnectorNames,
  getCachedConnector,
  injected,
  walletconnect,
} from "../contracts/connectors";

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    const connector = getCachedConnector();
    if (connector) {
      if (connector === ConnectorNames.Metamask) {
        injected.isAuthorized().then((isAuthorized: boolean) => {
          if (isAuthorized) {
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            });
          } else {
            setTried(true);
          }
        });
      } else if (connector === ConnectorNames.WalletConnect) {
        activate(walletconnect).catch(() => {
          setTried(true);
        });
      }
    }
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
