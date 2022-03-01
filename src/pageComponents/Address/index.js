
import {useMemo, useCallback} from 'react'

import styled from 'styled-components'

import copy from 'copy-to-clipboard'
import Identicon from 'identicon.js'

import {
    Button,
    TextSM,
    Icon,
    WingBlank
} from '../../components'


import useToast from '../../hook/useToast'

import {useConnectWallet} from '../ConnectWallet'

import {useWeb3, utils} from '../../web3'
const {shortAddress} = utils


function Address() {
    const {open} = useToast()
    const {open:openNet} = useConnectWallet()
    const {account, unlock} = useWeb3()
    const short = useMemo(() => unlock?shortAddress(account, 8):'no address', [unlock, account])
    // const hash = useMemo(()=> 'data:image/png;base64,'+ new Identicon(account).toString(),[account])
    const copyAddress = useCallback(() => {
        if ( unlock ) {
            copy(account)
            open('copied')
        }
    }, [account, unlock])
    return (
        !unlock ?
        <Button
            size='0'
            status='3'
            onClick={openNet}
        >
            <TextSM color='0'>Connect Wallet</TextSM>
        </Button>
        :
        <AddressButton
            size='3'
            status='4'
            onClick={copyAddress}
        >
            {/* <AddressImg src={hash}/> */}
            {/* <WingBlank /> */}
            <TextSM color='0'>
                {short} <Icon size='12' type='icon-icon-fuzhidao'/>
            </TextSM>
        </AddressButton>
    )
}

export default Address

// const AddressImg = styled.img`
//     display: block;
//     border: 2px solid  #fff;
//     border-radius: 100px;
//     width: 24px;
// `

const AddressButton = styled(Button)`
    padding: .3rem 1.4rem !important;
    border-radius: 100px !important;
`