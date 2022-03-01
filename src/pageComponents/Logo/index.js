import styled from "styled-components"

import {Icon} from '../../components'

function Logo({children, size, ...other}) {
    return (
        <OutBlock {...other} onClick={() => {
            window.history.go(-1)
        }}>
            <LogoImg size={size} src='/logo.svg'/>
            {children}
        </OutBlock>
    )
}

export default Logo

const default_w = '4'
const OutBlock = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* background: linear-gradient(90deg, #F3503C 0%, #FE06F0 100%); */
    opacity: 1;
    /* border-radius: 90px; */
`
const LogoImg = styled.img`
    width: ${p => p.theme.size[p.size] || default_w}rem;
    height: ${p => p.theme.size[p.size] || default_w}rem;
    display: block;
`