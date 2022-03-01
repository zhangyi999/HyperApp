/*
 * @Author: sam
 * @Date: 2021-07-23 21:13:10
 * @LastEditTime: 2021-07-23 21:40:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/hook/useCountdown.js
 */

import {useEffect, useState, useMemo} from 'react' 
import {DateFormat} from '../utils'

function countDown(time, format) {
    var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
    var inputTime = +new Date(time); // 返回的是用户输入时间总的毫秒数
    var times = (inputTime - nowTime) / 1000; // times是剩余时间总的秒数
    var formatStr = format
    var d = parseInt(times / 60 / 60 / 24); // 天
    d = d < 10 ? '0' + d : d;
    formatStr = formatStr.replace('dd',d);
    var h = parseInt(times / 60 / 60 % 24); //时
    h = h < 10 ? '0' + h : h;
    formatStr = formatStr.replace('hh',h);
    var m = parseInt(times / 60 % 60); // 分
    m = m < 10 ? '0' + m : m;
    formatStr = formatStr.replace('mm',m);
    var s = parseInt(times % 60); // 当前的秒
    s = s < 10 ? '0' + s : s;
    formatStr = formatStr.replace('ss',s);
    return {
        format: formatStr,
        second: nowTime
    }
}


function useCountdown({end, format = 'd day hh:mm:ss'}) {
    // Format
    // 当前秒数
    const [date, setSecond] = useState({
        second: 0,
        format: '--',
        // start: 
    })

    const start = useMemo(() => +new Date(),[])
    const timing = useMemo(() => {
        return end > start && end > date.second
    }, [end, date.second])

    useEffect(() => {
        let times;
        if ( timing ) {
            times = setInterval(() => {
                // console.log(countDown(end, format),'countDown(end, format)')
                setSecond(countDown(end, format))
            }, 1000)
        }
        return () => clearInterval(times)
    }, [timing, end])

    return {
        timing,
        ...date
    }
}

export default useCountdown



// const COUNTDOWN_SECONDS = 5

export function useSmiCountdown(end) {
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
                str: DateFormat(time),
                num: time
            })
            
        }, 1000);
        return () => clearInterval(count)
    },[end])
    return timing
}