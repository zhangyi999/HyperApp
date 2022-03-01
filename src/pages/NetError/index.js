

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

import Logo from '../../pageComponents/Logo'


function NetError() {
    return (
        <Card
            align='center'
            style={{margin:'20% auto',width:'90%'}}
        >
            <FlexBlock flex justify="center">
                <Logo/>
            </FlexBlock>
            <WhiteSpace size='gl'></WhiteSpace>
            <TextGL align="center">This network is not currently supported</TextGL>
            <WhiteSpace size='gl'></WhiteSpace>
            <TextGL size="1">Please select BSC network</TextGL>
            <WhiteSpace size='xxl'></WhiteSpace>
        </Card>
    )
}

export default NetError