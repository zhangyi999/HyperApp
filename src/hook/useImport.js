import { useState, useEffect } from "react";

// 这里 要用 回调函数，否则每次 render 都会去请求 
function useImport(proFun, types = '') {
    const [ready, setReady] = useState({
        ready: false,
        module: types,
        error: false
    })
    const onReady = async () => {
        setReady(v => ({
            ...v,
            ready: false,
        }))
        let module;
        try {
            module = await (proFun instanceof Array?Promise.all(proFun.map(v => v())):proFun())
            setReady({
                ready: true,
                module,
                error: false
            })
        } catch(err) {
            module = types
            setReady({
                ready: false,
                module,
                error: true
            })
        }
    }

    useEffect(() => {
        onReady()
    }, [])
    return {...ready, onReady}
}

export default useImport