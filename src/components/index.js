/*
 * @Author: sam
 * @Date: 2021-06-23 20:05:17
 * @LastEditTime: 2021-07-15 11:35:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/index.js
 */
import styled from 'styled-components';

export {default as Icon, Nothing, I} from './IconFont' 
export {default as Button, Link, ChooseButtons, TabStyled, CheckButton} from './Button' 
export {default as Dialog} from './Dialog' 
export {default as Coin, Coins, NoData, WalletIcon} from './Coin' 
export {default as Input} from './Input' 
export {default as Table} from './Table' 
export {default as Progress} from './Progress' 
export {default as Tooltip} from './Tooltip' 
export {default as IOSLoadingIcon} from './IOSLoadingIcon'
export {default as Ready} from './Ready'

export {default as LineLoading} from './LineLoading'

const getPadding = (pds = [0]) => pds.join('rem ') + 'rem'

const MAX_WIDTH = 1080;

export const Hr = styled.div`
    width: ${props => props.w || 100}%;
    height: 1px;
    transform: scaleY(50%);
    background-color: ${ p => p.color || '#335757' };
    ${p => p.padding ? `padding: ${p.padding[0] || 0}rem ${p.padding[1] || 0}rem`:''};
`

export const HrDotted = styled.div`
    width: ${props => props.w || 100}%;
    height: 1px;
    transform: scaleY(50%);
    /* background-color: ${ p => p.color || '#335757' }; */
    ${p => p.padding ? `padding: ${p.padding[0] || 0}rem ${p.padding[1] || 0}rem`:''};
    background-image: linear-gradient(to right, ${ p => p.theme.color[p.color || 4] } 0%, ${ p => p.theme.color[p.color || 4] } 50%, transparent 50%);
    // 设置图片宽度与高度
    background-size: 6px 1rem;
    background-repeat: repeat-x;
`

export const HrCol = styled.div`
    position: relative;
    top: 0px;
    &::after {
        position: absolute;
        content: '';
        width: 1px;
        height: ${p => p.h || 30}px;
        top: calc(50% - ${p => p.h/2 || 15}px);
        /* transform: scaleX(50%); */
        background-color: ${ p => p.color || p.theme.body };
        /* ${p => p.padding ? `padding: ${p.padding[0] || 0}rem ${p.padding[1] || 0}rem`:''}; */
    }
    
`

export const WingBlank = styled.span`
    min-width: ${p => p.theme.size[p.size] || 1}rem;
    height: 1px;
    display: inline-block;
`

export const WhiteSpace = styled.div`
    width: 100%;
    text-align: center;
    height: ${p => p.theme.size[p.size] || 1}rem;
`

export const MobileWhiteSpace = styled.div`
    display: ${p => p.theme.isPc ? 'none': 'block'};
    width: 100%;
    height: ${p => p.theme.size[p.size] || 2}rem;
`

export const Card = styled.div`
    position: relative;
    display: ${p => (p.flex) ? 'flex' : 'block' };
    width: ${p => p.w || 100}%;
    overflow: hidden;
    border-radius: ${p => p.draw ? p.theme.borderRadius+' '+ p.theme.borderRadius + ' 0px 0px' : p.theme.borderRadius};
    
    box-shadow: ${props => props.theme.boxShadow};
    ${props => props.theme.block[props.b || 0]};

    text-align: ${props => props.align || 'left'};
    padding: ${p => p.pds?getPadding(p.pds) : '1.6rem'};
    margin: ${p => p.mar?getPadding(p.mar) : '0rem'};
    box-sizing: border-box;
    z-index: 1;
    /* border: 1px solid #DDDDDD; */
`

export const CardMD = styled(Card)`
    width: ${p => (p.theme.isPc && p.w) || 'calc(100% - 3.2rem)'};
    max-width: 560px;
    margin-right: auto;
    margin-left: auto;
`

export const CardTX = styled(Card)`
    overflow: unset;
    ${props => props.theme.block[2]};
`

const P_SIZE = 1.6
const PolylineBLock = styled.div`
    position: relative;
    &:after {
        content: '';
        position: absolute;
        width: ${P_SIZE}rem;
        height: ${P_SIZE}rem;
        border-radius: 100px;
        background: ${ p => p.theme.color[p.color || 4] };
        left: -${p => (p.cardPsd || 1.6) + P_SIZE / 2}rem;
        top: -${P_SIZE / 2}rem;
    }
    &:before {
        content: '';
        position: absolute;
        width: ${P_SIZE}rem;
        height: ${P_SIZE}rem;
        border-radius: 100px;
        background: ${ p => p.theme.color[p.color || 4] };
        right: -${p => (p.cardPsd || 1.6) + P_SIZE / 2}rem;
        top: -${P_SIZE / 2}rem;
    }

`
export const Polyline = ({color, cardPsd, ...other}) => {
    return (
        <PolylineBLock cardPsd={cardPsd} color={color} {...other}>
            <HrDotted color={color}/>
        </PolylineBLock>
    )
}


export const Text = styled.span`
    position: relative;
    font-size: ${props => props.theme.size[props.size || 0]}rem;
    color: ${props => props.active ? props.theme.active : props.theme.color[props.color || 0]};
    text-align: ${props => props.align || 'left'};
    display: inline-block;
    font-weight: ${p => p.b || 500};
    line-height: ${props => props.theme.size[props.size || 0]+0.2}rem;
`

export const TextSM = pro => <Text size={0} {...pro} />
export const TextM = pro => <Text size={1} {...pro} />
export const TextMD = pro => <Text size={2} {...pro} />
export const TextGL = pro => <Text size={3} {...pro} />
export const TextXL = pro => <Text size={4} {...pro} />
export const TextXXL = pro => <Text size={5} {...pro} />


export const TextLinear = styled(TextMD)`
    ${props => props.theme.block[props.color || 0]};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
`


export const TitleText = styled.h2`
    font-size: ${props => props.theme.size[props.size || 1]}rem;
    margin: 0;
    color: ${props => props.theme.color[props.color || 0]};
    font-weight: 600;
`

export const TextP = styled.p`
    margin: 0;
    font-size: ${props => props.theme.size[props.size || 1]}rem;
    color: ${props => props.theme.color[props.color || 2]};
    text-align: ${props => props.align || 'left'};
    cursor: default;
`

export const FlexBlock = styled.div`
    position: relative;
    display: ${p => (p.theme.isPc || p.flex) ? 'flex' : 'block' };
    width: ${p => (p.theme.isPc && p.w) || (p.w || 100)}%;
    box-sizing: border-box;
    text-align: ${props => props.center ? 'center' : 'unset'};
    justify-content: ${props => props.justify || 'space-between'};
    align-items: ${props => props.align || 'center'};
`

export const Block = styled.div`
    position: relative;
    width: ${p => (p.theme.isPc && p.w) || (p.w || 100)}%;
    box-sizing: border-box;
    text-align: ${props => props.center ? 'center' : (props.align || 'unset')};
`

export const Container = styled.div`
    display: ${p => p.flex ? 'flex': 'block'};
    justify-content: ${props => props.justify || 'space-between'};
    align-items: ${props => props.align || 'center'};
    position: relative;
    max-width: ${MAX_WIDTH}px;
    width: 100%;
    margin: auto;
    text-align: ${p => p.align || 'center'};
    box-sizing: border-box;
    padding: 8px 16px;
`


export const HeadBlock = styled(Block)`
    color: #999999;
    font-size: .9rem;
    font-weight: 600;
    text-align: ${p => p.theme.isPc ? 'center' : 'left' };
    padding: ${p => !p.theme.isPc ? '.3rem 0' : '0'};
    border-bottom: ${p => !p.theme.isPc ? '0.5px solid #e9e6e6' : 'none'};
    width: ${p => (p.theme.isPc && p.w) || 100}%;
`

export const RowBlock = styled(FlexBlock)`
    color: #fff;
    font-size: .9rem;
    font-weight: 500;
    text-align:  ${p => p.theme.isPc ? 'center' : 'right' };
    justify-content: ${p => p.theme.isPc ? 'center' : 'flex-end' };
    width: ${p => p.theme.isPc ? (p.w || 100) : 100}%;
    padding: ${p => !p.theme.isPc ? '.3rem 0' : '0'};
    border-bottom: ${p => !p.theme.isPc ? '0.5px solid #e9e6e6' : 'none'};
`

export const CardTable = styled(Card)`
    padding: 1rem;
` 

const fPadding = p => p.theme.isPc ? '.8rem' : 0
export const Float = styled.div`
    display: block;
    width: ${p => p.theme.isPc ? (100 / p.col) : 100}%;
    float: ${p => p.theme.isPc ? p.right?'right':'left': 'none'};
    padding: ${fPadding};
    /* padding-bottom: ${fPadding}; */
    /* padding-left: ${fPadding}; */
    /* padding: ${p => p.theme.isPc ? '.8rem' : 0}; */
`

export const FloatClear = styled.div`
    margin: 0 ${p => p.theme.isPc ? '-.8rem' : 0};
    &::after {
        content: "";
        clear: both;
        /* width: 100%; */
        display: block;
    }
`



export function Fragment({children}) {
    return <>{children}</>
}

export function IfShow({children, show}) {
    if ( show ) return children
    return null
}


export const APR = styled(TextM)`
    font-size: 32px;
    /* filter: brightness(110%); */
    /* text-shadow: 0 0 2px #64e3ec; */
    
    ${TextSM} {
        font-size: 20px;
    }
    animation: pink 1.5s ease-in-out infinite alternate;
    @keyframes pink {
        to {
            text-shadow: 0 0 10px #6473ec;
            /* text-shadow: 0 0 5px #fff, 0 0 20px #64e3ec, 0 0 40px #1e676c, 0 0 100px #1c6f75; */
        }
    }
`


export const Hot = styled.span`
    background: ${p => p.theme.color[5]};
    padding: 0px 4px;
    margin-left: 4px;
    border-radius: 4px;
`