/*
 * @Author: sam
 * @Date: 2021-07-19 22:37:26
 * @LastEditTime: 2021-07-20 00:05:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/hook/useButtonText.js
 */

import {useState, useEffect} from 'react'

// 这里要是 传入 元素的话 需要 报上 memo
function useButtonText(initChildren) {
    const [button, setButton] = useState({
        loading: false,
        children: initChildren
    })

    const loadingButton = children => {
        setButton({
            loading: true,
            children: children || initChildren
        })
    }

    const initButton = (children = initChildren) => {
        setButton({
            loading: false,
            children: children
        })
    }

    const setDisabled = dBool => {
        setButton(v => ({
            ...v,
            disabled: dBool
        }))
    }

    const setButtonText = (children = initChildren) => {
        setButton(v => {
            if ( v.loading ) return v
            return {
                loading: v.loading,
                children: children
            }
        })
    }

    useEffect(() => {
        setButton(v => ({
            loading: v.loading,
            children: v.loading === false ? initChildren : v.children
        }))
    }, [initChildren])

    return {
        button,
        loadingButton,
        initButton,
        setButtonText,
        setDisabled
        // disabled
    }
}

export default useButtonText