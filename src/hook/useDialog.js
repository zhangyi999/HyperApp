/*
 * @Author: sam
 * @Date: 2021-06-28 01:31:38
 * @LastEditTime: 2021-06-30 22:30:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/hook/useDialog.js
 */

import { useContext } from 'react'

import {DialogContext} from '../context'

function useDialog(content, dialogProps) {
    const {
        open: openDialog,
        close,
    } = useContext(DialogContext)
    const open = contents => {
        openDialog( contents && !contents.target ? contents : content, dialogProps)
    }
    return {
        close,
        open
    }
}

export default useDialog
