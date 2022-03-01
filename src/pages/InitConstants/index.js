import { useCallback } from 'react'

import {Ready} from '../../components'

import {useImport} from '../../hook'

import {initConstants} from '../../contract/constants'
import {useWeb3} from '../../web3'
import { useEffect } from 'react'

// import BalanceContext from '../../context/BalanceContext'
import NetError from '../NetError'

function Provider({children}) {
    return (
        <div>
            {children}
        </div>
    )
}

function InitConstants({children}) {
    const {chainName} = useWeb3('InitConstants')
    // console.log(chainName,'chainName')
    const init = useCallback(() => initConstants(chainName), [chainName])
    const {ready, error, onReady} = useImport(init, {})
    useEffect(()=> {
        onReady()
    },[chainName])
    
    return (
        <Ready ready={ready || error}>
            {
                error?
                <NetError />:
                <Provider>{children}</Provider>
            }
        </Ready>
    )
}

export default InitConstants