import {useState, useCallback} from 'react'

import {
    useToast
} from '../../hook'

import {Button} from '../../components'

import {BN, MAX_UINT, ERC20, useWeb3, SendOn} from '../../web3'

// coins [address, decimal, name, numStr,isClear]
function useApprove(coins, senderAddress, confirmationCall, errorCall, needApprove, before) {
    const {account} = useWeb3()

    const {open} = useToast()

    const [button, setButton] = useState({
        loading: false,
        children: null
    })

    const onClick = async () => {
        if ( !before() ) return
        let index = 0
        if ( needApprove ) {
            while (coins[index]) {
                const [tokenAddress, decimals, name, numStr, isMax,needClear] = coins[index]
                // console.log({tokenAddress, decimals, name, numStr})
                index++
                if ( numStr === '' || numStr*1 === 0 ) continue
                // init data
                const numWei = BN(numStr).times(10**decimals).decimalPlaces(0)
                const erc20 = ERC20(tokenAddress)
                const owner = account
                // 检查授权额度
                const allowance = await erc20.methods.allowance( owner, senderAddress ).call()
                // 无需授权
                if (BN(numWei).lte(allowance)) {
                    continue
                }
                // 需要授权
                // 需要取消授权
                if ( needClear === true ) {
                    setButton({
                        loading: true,
                        children: 'Reset Approve ' + name
                    })
                    const {confirmation} = SendOn(erc20.methods.approve( senderAddress, '0'))
                    const [err, status] = await confirmation()
                    if ( err ) {
                        // 交易检测失败
                        index = -1
                        open('Reset Approve ' + name + ' Fail', 'error')
                        setButton({
                            loading: false,
                            children: 'Approve'
                        })
                        return
                    }
                }
                // 重新授权
                setButton({
                    loading: true,
                    children: 'Approve ' + name
                })
                // 判断是否无限授权
                const {confirmation} = SendOn(erc20.methods.approve( senderAddress, isMax === true ? MAX_UINT : numWei.toString(10)))
                const [err, status] = await confirmation()
                if ( err ) {
                    // 交易检测失败
                    index = -1
                    open('Approve ' + name + ' Fail', 'error')
                    setButton({
                        loading: false,
                        children: 'Approve'
                    })
                    // 交易报错
                    // if ( status === -1 ) {

                    // }
                    return
                }
                open(name + ' Approve Success')
            }
        }
        if ( index === -1 ) {
            errorCall()
        } else {
            setButton({
                loading: false,
                children: null
            })
            confirmationCall()
        }
    }

    return {
        onClick,
        button
    }
}

function Approve({loading, approve = true, children, sender, coins = [], then = () => {}, error = () => {}, before = () => true, ...other}) {
    const {button, onClick} = useApprove(coins, sender, then, error, approve, before)
    // console.log('Approve')
    return (
        <Button
            loading={ loading || button.loading }
            onClick={onClick}
            {...other}
        >
            {
                button.loading === true?
                    button.children:children
            }
        </Button>
    )
}

export default Approve