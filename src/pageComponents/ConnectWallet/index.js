
import { useMemo, useEffect } from 'react'
import styled from 'styled-components'

import {
    Button,
    // FlexBlock,
    Icon,
    Card,
    TextGL,
    TextMD,
    TextM,
    TextSM,
    TitleText,
    WhiteSpace,
    WalletIcon,
    FlexBlock,
    CheckButton,
    TextLinear
} from '../../components'

import useDrawer from '../../hook/useDrawer'

import {useWeb3, utils} from '../../web3'
// const {shortAddress} = utils

function ChooseWallet( ) {
    const {connectWalletConnect, connect} = useWeb3()
    return (
        <Card
            b='4'
            pds={[3.2, 1.6, 5]}
        >
            <WhiteSpace size='3'/>
            <TextMD b={800}>Connect wallet</TextMD>
            <WhiteSpace size='3'/>
            <TextLinear size='1'>Support Network</TextLinear>
            <WhiteSpace size='2' />
            <FlexBlock flex>
                <CheckButton style={{width:'60%'}} w='100' checked >
                    <TextSM>Binance Smart Chain</TextSM>
                </CheckButton>
            </FlexBlock>
            <WhiteSpace  size='2'/>
            <TextLinear size='1'>Selected Wallet</TextLinear>
            <WhiteSpace size='2' />
            <FlexBlock flex>
                <Card
                    onClick={connect}
                    b={1}
                    align='center'
                    w='48'
                >
                    <Icon size='30' type='icon-metamask'/>
                    <WhiteSpace />
                    <TextSM>MetaMask</TextSM>
                </Card>
                <Card
                    onClick={connectWalletConnect}
                    b={1}
                    align='center'
                    w='48'
                >
                    <Icon size='30' type='icon-WalletConnect'/>
                    <WhiteSpace />
                    <TextSM>WalletConnect</TextSM>
                </Card>
            </FlexBlock>
            
        </Card>
    )
}


export const useConnectWallet = () => {
    const {open, close} = useDrawer(<ChooseWallet/>, {closeButton: true})
    const {account, unlock, connected, chainName} = useWeb3()
    // const short = useMemo(() => shortAddress(account), [account])
    useEffect(() => {
        if ( unlock ) close()
    },[unlock, close])
    return {
        open,
        close,
        unlock,
        chainName
    }
}


function ConnectWallet( ) {
    const {unlock, chainName, open} = useConnectWallet()
    return (
        <Button status='4' onClick={() => { if( !unlock ) open()}}>
            {/* {short} */}
            <Icon type={chainName==='bsc' && unlock?'icon-bian':'icon-jinzhi--xian'} />
            {/* <HashAddress>
                <WalletIcon name={connected} />
            </HashAddress> */}
        </Button>
    )
}

export default ConnectWallet

const ChooseWalletButton = styled.div`
    background-color: #060A10;
    margin: 1.6rem;
    padding: 2rem;
    box-sizing: border-box;
    border-radius: ${p => p.theme.borderRadius};
    /* display: flex;
    align-items: center; */
    color: #fff;
    ${TextGL} {
        margin-left: 10px;
    }
`

const size=20
const HashAddress = styled.div`
    /* padding: 2px; */
    border-radius: 100px;
    /* background-color: #fff; */
    margin-left: 4px;
    width: ${size}px;
    height: ${size}px;
    line-height: ${size}px;
    display: flex;
    justify-content: center;
    align-items: center;
`