import {ThemeProvider, createGlobalStyle} from 'styled-components'

// import './vConsole.js'
import { SnackbarProvider } from 'notistack'

import theme from './theme'

import Web3Provider from './web3'

import SlippageProvider from './context/Slippage'
import DateDialog from './context/DateDialog'
import TransactionDialog from './context/TransactionDialog'





import Index from './pages'
Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Date.prototype.GMTFormat = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getUTCMonth() + 1, //月份 
      "d+": this.getUTCDate(), //日 
      "h+": this.getUTCHours(), //小时 
      "m+": this.getUTCMinutes(), //分 
      "s+": this.getUTCSeconds(), //秒 
      "q+": Math.floor((this.getUTCMonth() + 3) / 3), //季度 
      "S": this.getUTCMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

const InjectGlobal = createGlobalStyle`
  body {
    color: #fff;
    font-family: 'Montserrat', sans-serif;
  }
  body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    width: 200vw;
    height: 200vh;
    /* background: radial-gradient(50% 50% at 50% 50%,rgba(243,80,60,.05) 0,rgba(254,6,240,.02) 100%); */
    transform: translate(-50vw,-100vh);
    z-index: -1;
    background: ${p => p.theme.body};
  }
  a {
    text-decoration: none;
    color:inherit;
  }
  .SnackbarItem-contentRoot-22 {
    font-size: 1.4rem;
  }
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical:'top',
          horizontal:'right'
        }}
        resumeHideDuration={1.5e3}
        maxSnack={5}
      >
        <Web3Provider
          defaultChian={{
            chainId : '56',
            rpc: 'https://bsc-dataseed1.binance.org'
          }}
        >
          <TransactionDialog >
            <SlippageProvider>
                <DateDialog>
                  {/* dialog 要放在最里面，因为log 内容会引用其它全局 */}
                    <Index />
                    <InjectGlobal />
                </DateDialog>
            </SlippageProvider>
          </TransactionDialog>
        </Web3Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
