/*
 * @Author: sam
 * @Date: 2021-06-28 01:21:38
 * @LastEditTime: 2021-07-01 00:37:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/context/Dialog/index.js
 */

import {useState, createContext, useCallback } from 'react'

import styled from 'styled-components'
// import { UseWalletProvider } from 'use-wallet'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import {Icon} from '../../components'

const useStyles = makeStyles({
    paper: {
    //   borderRadius: 24,
      background: 'none',
      maxWidth: '1080px',
      margin: 'auto'
      // width: 'calc(100% - 32px) !important'
    },
    paperFullWidth : {
      maxWidth: "calc(100% - 24px) !important",
      width: "calc(100% - 24px)",
      margin: "6px !important",
      boxShadow: "0px 0px 20px rgba(0,0,0,.9)"
    }
  });



export const Context = createContext({})


function DrawerProvider({children}) {
    const classes = useStyles()
    const [props, setProps] = useState({})
    const [content, setContent] = useState(null)
    const [opened, setOpen] = useState(false)
    const closeDialog = useCallback(() => {
        // setProps(null)
        setContent(null)
        setOpen(false)
    },[])
    const open = useCallback(( content, props = {} ) => {
        setProps(props)
        setContent(content)
        setOpen(true)
    },[])
    const {closeButton, closeStyle,anchor = 'bottom',...other} = props
    return (
        <Context.Provider
            value={{
                open,
                close: closeDialog,
                setContent
            }}
        >
            {children}
            <Drawer
                classes={classes}
                anchor={anchor}
                {...other}
                onClose={closeDialog}
                open={opened}
            >
                {
                    closeButton?
                        <CloseButton
                            style={closeStyle}
                            onClick={closeDialog}
                        />
                        :null
                }
                {content}
            </Drawer>
        </Context.Provider>
    )
}

export default DrawerProvider

const CloseButton = styled.div`
    position: absolute;
    /* color: ${p => p.theme.color['0']}; */
    background: #888aa2;
    top: 2.4rem;
    left: 42%;
    width: 16%;
    height: .7rem;
    width: 8rem;
    border-radius: 100px;
    z-index: 99;
`