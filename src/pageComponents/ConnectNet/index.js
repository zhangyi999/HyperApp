
import styled from 'styled-components'

import {
    Icon
} from '../../components'

function ConnectNet() {
    return (
        <NetBlock><Icon type="icon-bian-01"/></NetBlock>
    )
}

export default ConnectNet

const NetBlock = styled.div`
    padding: 1rem;
    box-sizing: border-box;
    width: 40px;
    border-radius: ${p => p.theme.borderRadius};
    background-color: #fff;
`