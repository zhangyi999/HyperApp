/*
 * @Author: sam
 * @Date: 2021-07-23 21:06:54
 * @LastEditTime: 2021-07-23 21:13:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/Countdown/index.js
 */

import {useState, useEffect} from 'react'

import {DateFormat} from '../../utils'

// const COUNTDOWN_SECONDS = 5

function useCountdown(end) {
    const [timing, setTiming] = useState(()=> ({
        str: DateFormat(0),
        num: 0
    }))

    useEffect(() => {
        const count = setInterval(() => {
            const time = end - (~~(new Date() / 1000))
            if ( time <= 0 ) {
                clearInterval(count)
                setTiming({
                    str: DateFormat(0),
                    num: 0
                })
                return
            }
            setTiming({
                str: DateFormat(end),
                num: end
            })
            
        }, 1000);
        return () => clearInterval(count)
    },[end])
    return timing
}

export default useCountdown