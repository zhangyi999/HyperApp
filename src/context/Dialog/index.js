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

import {Dialog, Icon} from '../../components'

export const Context = createContext({})


function DialogProvider({children}) {
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
    const {closeButton, ...other} = props
    return (
        <Context.Provider
            value={{
                open,
                close: closeDialog,
                setContent
            }}
        >
            {children}
            <Dialog
                fullWidth
                maxWidth='sm'
                scroll='body'
                {...other}
                onClose={closeDialog}
                aria-labelledby="simple-dialog-title"
                open={opened}
            >
                {
                    closeButton?<CloseButton onClick={closeDialog} type='icon-error' size='22' />:null
                }
                {content}
            </Dialog>
        </Context.Provider>
    )
}

export default DialogProvider

const CloseButton =styled(Icon)`
    position: absolute;
    right: 1.2rem;
    top: 1.2rem;
    color: ${p => p.theme.color['1']};
    z-index: 1;
`