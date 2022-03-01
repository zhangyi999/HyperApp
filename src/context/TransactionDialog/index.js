// import { useContext } from 'react'
import {useContext, useState, createContext, useCallback, useMemo } from 'react'

import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
    
// import { UseWalletProvider } from 'use-wallet'

import {
    CardTX,
    Icon,
    TitleText,
    WhiteSpace
} from '../../components'

export const Context = createContext({})


const useStyles = makeStyles({
    paper: {
        borderRadius: 36,
        overflow: 'initial'
    }
})

const size = '40'
const SIcon = styled(Icon)`
    position: relative;
    width: ${size}px;
    height: ${size}px;
    /* margin: auto; */
`

const StatusIcon = styled.div`
    position: absolute;
    top: -20px;
    width: ${size}px;
    height: ${size}px;
    left: 50%;
    margin-left: -${size/2}px;
    background: #050a10;
    border-radius: 100px;
`


// Inspired by the former Facebook spinners.
const heights = 75
const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        height: heights + 10 + 'px'

    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        position: 'absolute',
        left: '50%',
        marginLeft: '-35px'
    },
    top: {
        color: '#fc27bc',
        animationDuration: '1550ms',
        position: 'absolute',
        left: '50%',
        marginLeft: '-35px'
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

function PendingCircular(props) {
    const classes = useStylesFacebook();
    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={heights}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={heights}
                thickness={4}
                {...props}
            />
        </div>
    )
}

function Successful({children}) {
    return (
        <CardTX align='center'>
            <StatusIcon>
                <SIcon type='icon-queren'/>
            </StatusIcon>
            <WhiteSpace size='xxl'/>
            <TitleText>SUCCESS</TitleText>
            <WhiteSpace size='gl'/>
            {children}
            <WhiteSpace size='gl'/>
        </CardTX>
    )
}

function Pending({children}) {
    return (
        <CardTX align='center'>
            <WhiteSpace size='gl'/>
            <PendingCircular />
            <WhiteSpace size='gl'/>
            <TitleText>Waiting For confirmation</TitleText>
            <WhiteSpace size='gl'/>
            {children}
            <WhiteSpace size='gl'/>
        </CardTX>
    )
}

function Fail({children}) {
    return (
        <CardTX align='center'>
            <StatusIcon>
                <SIcon type='icon-cuowu1'/>
            </StatusIcon>
            <WhiteSpace size='xxl'/>
            <TitleText>Transaction FAIL</TitleText>
            <WhiteSpace size='gl'/>
            {children}
            <WhiteSpace size='gl'/>
        </CardTX>
    )
}

function Loading({children}) {
    return (
        <CardTX align='center'>
            <WhiteSpace size='gl'/>
            <SIcon style={{color:'#888'}} type='icon-await'/>
            <WhiteSpace size='gl'/>
            <TitleText>Transaction LOADING</TitleText>
            <WhiteSpace size='gl'/>
            {children}
            <WhiteSpace size='gl'/>
        </CardTX>
    )
}

const TX_TYPE = {
    loading: Loading,
    success: Successful,
    pending: Pending,
    fail: Fail
}

function TransactionDialog({children, ...other}) {
    const classes = useStyles();
    const [transaction, setOpen] = useState({
        opened: false,
        content: '',
        type: 0
    })
    const openTransaction = useCallback((type='loading', content='') => {
        setOpen({
            opened: true,
            content,
            type
        })
    }, [])
    const closeTransaction = useCallback(() => {
        setOpen( v => ({
            ...v,
            opened: false
        }))
    }, [])
    const changeStatus = useCallback((type, content) => {
        setOpen( v => ({
            content: content || v.content,
            type,
            ...v
        }))
    },[])
    const TransactionDome = useMemo(() => TX_TYPE[transaction.type] || TX_TYPE.loading,[transaction.type])
    return (
        <Context.Provider
            value={{
                closeTransaction,
                openTransaction,
                changeStatus
            }}
        >
            {children}
            <Dialog
                fullWidth
                maxWidth='xs'
                scroll='body'
                {...other}
                onClose={closeTransaction}
                aria-labelledby="simple-dialog-title"
                open={transaction.opened}
                classes={{
                    paper: classes.paper
                }}
            >
                <TransactionDome>
                    <CloseButton onClick={closeTransaction}>
                        <Icon size='24' style={{color:'#909090'}} type='icon-tubiao-24'/>
                    </CloseButton>
                    <Content>
                        {transaction.content}
                    </Content>
                </TransactionDome>
            </Dialog>
        </Context.Provider>
    )
}

export default TransactionDialog

export function useTransactionDialog() {
    return useContext(Context)
}


const CloseButton = styled.div`
    position: absolute;
    right: 14px;
    top: 14px;
`

const Content = styled.div`
    padding: 1rem;
    background: #050910;
    color: #fff;
    border-radius: 16px;
`