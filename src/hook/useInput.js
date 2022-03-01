/*
 * @Author: sam
 * @Date: 2021-06-26 18:42:17
 * @LastEditTime: 2021-07-09 00:07:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/hook/useInput.js
 */

import { useState, useCallback} from "react";

function useInput(initValue, position = {}) {
    const [value, setValue] = useState(initValue)
    const onChange = useCallback(value => {
        if ( value.target ) {
            setValue(value.target.value)
        } else {
            setValue(value)
        }
    },[])
    return {
        value,
        onChange,
        ...position
    }
}

export default useInput

export function useInputs(obj) {
    const [value, setValue] = useState(obj)
    return {
        value,
        set: key => ({
            value: value[key],
            onChange: value => setValue( v => ({
                ...v,
                [key]: value
            })),
            name: key
        })
    }
}