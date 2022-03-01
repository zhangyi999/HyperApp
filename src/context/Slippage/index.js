/*
 * @Author: sam
 * @Date: 2021-06-28 10:04:28
 * @LastEditTime: 2021-07-11 17:56:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/context/Slippage/index.js
 */

import {useState, createContext } from 'react'

import styled from 'styled-components'
// import { UseWalletProvider } from 'use-wallet'
import { withStyles, makeStyles } from '@material-ui/styles';
// import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
// import Tooltip from '@material-ui/core/Tooltip';

import {inPc} from '../../theme'

import {
    Dialog,
    FlexBlock,
    Text,
    Icon,
    Hr,
    WhiteSpace,
    ChooseButtons,
    Input,
    MobileWhiteSpace,
    Tooltip,
    WingBlank
} from '../../components'

// 不能直接 引入 hook/index , Context 这里会循环引用
import useInput from '../../hook/useInput'

export const Context = createContext({})

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: '1.2rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    closeButton: {
        position: 'absolute',
        right: '1rem',
        top: '1rem',
        color: '#ddd',
    }    
});

const useStyles = makeStyles({
    paperAnchorBottom : {
        borderRadius: '3rem 3rem 1rem 1rem'
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Text size='1.8'>{children}</Text>
            {
                onClose ? (
                <IconButton aria-label="close"  onClick={onClose}>
                    <Icon type='icon-tubiao-24' />
                </IconButton>
                ) : null
            }
        </MuiDialogTitle>
    );
});

const ACTIVE_LIST = [
    {
        title: '0.1%',
        id: '0.1'
    },
    {
        title: '0.5%',
        id: '0.5'
    },
    {
        title: '1%',
        id: '1'
    }
]

function Slippage({close, active, timeScends}) {
    return (
        <BlockIn>
            <DialogTitle onClose={close}>
                Setting
            </DialogTitle>
            <Hr />
            <WhiteSpace />
            <Tooltip
                title='Your transaction will revert if the price changes unfavorably by more than this percentage'
                placement={inPc?'right':'top'}
                arrow
                style={{margin: 0}}
            >
                <Text>
                    Slippage tolerance 
                    <Icon type='icon-i'/>
                </Text>
            </Tooltip>
            <WhiteSpace />
            <FlexBlock>
                <ChooseButtons
                    {...active}
                    list={ACTIVE_LIST}
                />
                <WingBlank />
                <MobileWhiteSpace />
                <Input input={active} after='%'/>
            </FlexBlock>
            <WhiteSpace />
            <Tooltip
                title='Your transaction will revert if it is pending for more than this long.'
                placement="top"
                arrow
                style={{margin: 0}}
            >
                <Text>
                    Transaction deadline 
                    <Icon type='icon-i'/>
                </Text>
            </Tooltip>
            <WhiteSpace />
            <Input input={timeScends} after='Minutes'/>
            <WhiteSpace />
        </BlockIn>
    )
}


function SlippageProvider({children}) {

    const timeScends = useInput(20,{type:'number'}) // 20 minute
    const slippage = useInput('0.5',{type:'number'})
    const [opened, setOpen] = useState(false)
    const close = () => {
        setOpen(false)

    }
    const open = () => setOpen(true)
    const classes = useStyles()
    return (
        <Context.Provider
            value={{
                timeScends,
                slippage,
                open,
                close
            }}
        >
            {children}
            {
                inPc?
                <Dialog fullWidth maxWidth='sm' onClose={close} aria-labelledby="simple-dialog-title" open={opened}>
                    <Slippage timeScends={timeScends} active={slippage} close={close} />
                </Dialog>:
                <Drawer classes={classes} anchor={'bottom'} open={opened} onClose={open}>
                    <Slippage timeScends={timeScends} active={slippage} close={close} />
                </Drawer>
            }
            
        </Context.Provider>
    )
}

export default SlippageProvider


const BlockIn = styled.div`
    padding: 1.4rem 2rem;
    width: 100%;
    box-sizing: border-box;
`