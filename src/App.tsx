import { Box, ThemeProvider } from "@mui/system";
import { SnackbarProvider } from "notistack";
import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./layout";
import theme from "./mui-theme";
import DAO from "./pages/dao";
import Pools from "./pages/pools";
import AddPool from "./pages/pools/add";
import Swap from "./pages/swap";

import {
  UnsupportedChainIdError,
  useWeb3React,
  Web3ReactProvider,
} from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect } from "./hooks/useEagerConnect";
import { useInactiveListener } from "./hooks/useInactiveListener";
import { cacheConnector, ConnectorNames } from "./web3/connectors";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import {
  SettingContext,
  settingInitData,
  SettingReducer,
} from "./contexts/setting";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  const [settingState, changeSettingState] = useReducer(
    SettingReducer,
    settingInitData
  );
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        resumeHideDuration={1.5e3}
        maxSnack={5}
      >
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ContentHandler>
            <SettingContext.Provider
              value={{ settingState, changeSettingState }}
            >
              <Router>
                <Layout>
                  <Switch>
                    <Route path="/dao" component={DAO} />
                    <Route path="/pools/add" component={AddPool} />
                    <Route path="/pools" component={Pools} />
                    <Route path="/" component={Swap} />
                  </Switch>
                </Layout>
              </Router>
            </SettingContext.Provider>
          </Web3ContentHandler>
        </Web3ReactProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

const Web3ContentHandler: React.FC = ({ children }) => {
  const { connector, account, active, error } = useWeb3React<Web3Provider>();

  React.useEffect(() => {
    if (connector) {
      if (connector instanceof InjectedConnector) {
        cacheConnector(ConnectorNames.Metamask);
      } else if (connector instanceof WalletConnectConnector) {
        cacheConnector(ConnectorNames.WalletConnect);
      }
    }
  }, [connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  if (error instanceof UnsupportedChainIdError) {
    return <Box>Net Error</Box>;
  }
  return <Box>{children}</Box>;
};
