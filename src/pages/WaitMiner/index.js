

import { useEffect } from 'react'
import {
    Container,
    TextGL,
    FlexBlock,
    WhiteSpace,
    Card,
    Block,
    TextMD,
    TextXL,
    // Button,
    // WingBlank,
    // TextM,
    // Input,
    // Icon
} from '../../components'

import {useSmiCountdown} from '../../hook/useCountdown'
import Logo from '../../pageComponents/Logo'

// import './test'

// function useTest(params) {
    
// }



// export const END = ~~(new Date('2021.11.16 20:00:00') / 1000 + 10)
export const END = 1636962447 + 120
export const NOW = () => ~~(new Date() / 1000)
function Countdown() {
    const res = useSmiCountdown(END)
    useEffect(() => {
        if ( NOW() >= END ) window.location.reload()
    }, [res.num])
    return <TextXL>{res.str}</TextXL>
}

function WaitMiner() {
    return (
        <Card align='center' style={{margin:'20% auto',width:'90%'}}>
            <FlexBlock flex justify="center">
                <Logo/>
            </FlexBlock>
            <WhiteSpace size='gl'></WhiteSpace>
            <TextGL >XPS Mining To Start Soon</TextGL>
            <WhiteSpace size='gl'></WhiteSpace>
            <TextGL size="1">Contracts under deployment</TextGL>
            <WhiteSpace size='xxl'></WhiteSpace>
            <Countdown />
        </Card>
    )
}

export default WaitMiner