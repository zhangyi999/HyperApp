
import styled from 'styled-components'

import {Icon} from '../../components'

function OpenRouter() {
    return (
        <RBlock><Icon type="icon-drag"/></RBlock>
    )
}

export default OpenRouter

const RBlock = styled.div`
    padding: 4px 0px 4px 6px;
    display: flex;
    align-items: center;
    margin-left: 8px;
    color: ${p => p.theme.color.brown};
`
