/*
 * @Author: sam
 * @Date: 2021-06-24 16:40:26
 * @LastEditTime: 2021-07-15 15:35:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/hook/usePromise.js
 */

import {useState, useCallback, useEffect} from 'react'

// const deplay = () => new Promise(r => setTimeout(r,2000))

function usePromise( prom, data, {then = () => {} , fail = () => {},run = false, init = null} = {}) {
    if ( !(prom instanceof Function) ) throw 'prom need function'
    const [loading, setLoad] = useState(false)
    const [res, setRes] = useState(null)
    const [error, setError] = useState(null)
    const send = useCallback(async pData => {
        const reqData = (!pData || pData.target )? data : pData
        setLoad(true)
        try {
            const res = await prom(reqData)
            setRes(res)
            then(res)
        } catch (error) {
            console.warn(error)
            setError(error)
            fail(error)
        }
        setLoad(false)
    }, [prom, data, then, fail])
    useEffect(() => {
        if ( run ) {
            send(data)
        }
    },[data])
    return {
        success: res || init,
        error,
        loading,
        send
    }
}

export default usePromise

// promArr = [[prom, data1, data2, ...]]
export function usePromiseS(promArr, {then = () => {} , fail = () => {},run = false} = {}) {
    const [loading, setLoad] = useState(false)
    const [res, setRes] = useState(null)
    const [error, setError] = useState(null)
    const send = useCallback(async () => {
        setLoad(true)
        try {
            const res = await Promise.all(
                promArr.map( v => 
                    v[0](...v.slice(1))
                )
            )
            setRes(res)
            then(res)
        } catch (error) {
            console.warn(error)
            setError(error)
            fail(error)
        }
        setLoad(false)
    }, [promArr, then, fail])
    useEffect(() => {
        if ( run ) {
            send()
        }
    },[])
    return {
        success: res || [],
        error,
        loading,
        send
    }
}