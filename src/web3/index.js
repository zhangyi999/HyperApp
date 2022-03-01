import {useMemo, useEffect, useState, createContext, useContext, useRef, useCallback } from 'react'

import WalletConnectProvider from "@walletconnect/web3-provider";

import {
    getBlock,
    // decimalHex,
    PROXY_ZERO_ADDRESS,
    DEFAULT_PRC,
    DEFAULT_CHAIN_ID,
    ZERO_ADDRESS,
    setDefaultProvider,
    setProvider,
    initWeb3,
    reInitWeb3
} from 'web3-shell'

export * from 'web3-shell'


export const Context = createContext({})


const CHANG_TYPE ={
    "1": "main",
    "2": "ropsten",
    "3": "rinkeby",
    "100": "xDai",
    "56": "bsc",
    "66": "okc",
    "65": "tOkc",
    "256": "tHeco",
    "128": "heco",
    "1337": "bsc",
    "31337": "bsc",
    "1001": "tKlaytn",
    "8217": "klaytn",
    "137": "polygon",
    "80001": "tPolygon",
    "200": "xDai"
}



/**
创建 web3 为容器

链接 walletConnect： new walletConnect => provider => provider 添加到 web3
退出 walletConnect： on "disconnect" callback => setDefault provider => 添加到 web3

链接 metamask ：获取 web3 provider ，setProvider
退出 metamask ：监听 account => !account[0] === true => 设置 default provider

walletConnect 链接后 不会改变 监听 account
metamask 链接后 要监听 退出 change

chainId 监听不用改变

 */

const walletConnectRpc = {
    rpc: {
        1: "https://mainnet.mycustomnode.com",
        3: "https://ropsten.mycustomnode.com",
        100: "https://dai.poa.network",
        56: 'https://bsc-dataseed.binance.org',

        // ...
    },
}



function useWeb3Provider(defaultChian) {
    // 设置默认 provider 参数
    const [defaultChainId, defaultAccount] = useMemo(() => {
        setDefaultProvider(defaultChian)
        // 这里的挂载可能会 导致 chainId 为 null
        // 初始化
        // if (window.ethereum) {
        //     setProvider(window.ethereum)
        // } else if (window.web3) {
        //     setProvider(window.web3.currentProvider)
        // }
        const web3 = initWeb3()
        return [
            // (defaultChian.chainId || DEFAULT_CHAIN_ID)*1,
            web3.currentProvider.chainId,
            web3.currentProvider.selectedAddress
        ]
    },[defaultChian])
    
    // 初始打开的时候，账户默认为 设置的 默认地址
    const [chainId, setId] = useState(defaultChainId*1)
    const [account, setAccount] = useState(defaultAccount)

    // 默认没有安装钱包
    const [connected, setConnected] = useState( null )

    // 默认没有解锁
    const unlock = useMemo(() => !!account && PROXY_ZERO_ADDRESS !== account  && ZERO_ADDRESS !== account,  [account])
    // 链简写
    const chainName = useMemo(() => CHANG_TYPE[chainId*1] || 'Net Error',  [chainId])

    // 检测当前链接钱包
    const setWalletName = useCallback(() => {
        const web3 = initWeb3()
        let walletName = null
        if ( web3.currentProvider.isBitKeep ) {
            walletName = 'bitKeep'
        }
        else if ( web3.currentProvider.isTokenPocket ) {
            walletName = 'tp'
        }
        else if ( web3.currentProvider.isImToken ) {
            walletName = 'imToken'
        }
        else if ( web3.currentProvider.isMetaMask ) {
            walletName = 'metamask'
        }
        else if ( web3.currentProvider.bridge ) {
            walletName = 'WalletConnect'
        }
        else if ( web3.currentProvider.isTrust ) {
            walletName = 'trust'
        }
        else if ( web3.currentProvider.isONTO ) {
            walletName = 'onto'
        }
        else if ( window.web3 ) {
            walletName = 'other'
        }
        // console.log({
        //     walletName
        // })
        setConnected(walletName)
        return walletName
    },[])

    // 设置 account
    const setAccountUse = useCallback(() => {
        const web3 = initWeb3()
        Promise.all([
            web3.eth.getChainId(),
            web3.eth.getAccounts()
        ]).then(([id, [account]])=> {
            // 这里 id 已 rpc 为准
            setId(id*1)
            setAccount(account || PROXY_ZERO_ADDRESS)
            // setAccount('0xfE9EbCbb134b6d4c1DD201Cac9F5e680FB116C4B')
            
        })
    }, [])

    // 链接 metamask
    const connect = async () => {

        const web3 = reInitWeb3()
        // console.log(web3)
        if ( web3.currentProvider.enable ) {
            await web3.currentProvider.enable()
        } else {
            console.log('not install wallet')
        }
    }

    // 链接 wallet connect
    const connectWalletConnect = async () => {
        try {
            const provider = new WalletConnectProvider(walletConnectRpc)
            await provider.enable();
            setProvider(provider)
            setWalletName()
            provider.on("disconnect", () => {
                // 重置
                reInitWeb3()
            });       
        } catch (error) {
            console.log(
                error
            )
        }
    }

    // 刷新链接
    useEffect(() => {
        // const provider = new WalletConnectProvider(walletConnectRpc)
        // if ( provider.walletMeta ) connectWalletConnect()
        // else setWalletName()
        setWalletName()
    },[defaultChian.selectedAddress])
    // 开启监听 account
    useEffect(() => {
        // const 
        setAccountUse()
        const inter = setInterval(async () => {
            try {
                setAccountUse()
            } catch (error) {}
        }, 1000);
        return () => clearInterval(inter)
    },[])
    
    return {
        chainName,
        account,
        connect,
        connected,
        unlock,
        chainId,
        connectWalletConnect
    }
}

export function useWeb3( ) {

    const provider = useContext(Context)
    const [_, reLoad] = useState(true)

    const callRef = useRef(() => {
        // 这里会执行两次
        return getBlock.getNewBlock()
    })

    let getBlockNumber = () => {
        // 这里会执行两次
        return callRef.current()
    };

    // effect 是最后才执行的
    useEffect(() => {
        // 这里 只执行 1 次
        const oldCall = () => reLoad(v => !v)
        callRef.current = () => {
            getBlock.start(oldCall)
            return getBlock.getNewBlock()
        }
        // 激活
        oldCall()
        return () => {
            getBlock.remove(oldCall)
        }
    },[provider.chainId])

    return {
        ...provider,
        getBlockNumber
    }    
}

function Web3Provider({defaultChian = {} ,children }) {
    const {rpc=DEFAULT_PRC, selectedAddress=PROXY_ZERO_ADDRESS, chainId=DEFAULT_CHAIN_ID} = defaultChian
    const provider = useWeb3Provider({rpc, selectedAddress, chainId})
    // console.log(provider)
    return(
        <Context.Provider
            value={provider}
        >
            {children}
        </Context.Provider>
    )
}

export default Web3Provider