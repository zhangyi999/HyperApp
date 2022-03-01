/*
 * @Author: sam
 * @Date: 2021-06-23 21:27:52
 * @LastEditTime: 2021-07-20 02:23:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/Button/index.js
 */

import {useState, useCallback, useEffect} from 'react'

import styled,{css} from "styled-components";

import Button from '@material-ui/core/Button';

import {Link as Links} from 'react-router-dom'

import IOSLoadingIcon from '../IOSLoadingIcon'

import IconFont from '../IconFont'

function Buttons({children, loading, status,  ...other}) {
    // console.log(status,'status', status == '2')
    return <Button {...other} status={status}><IOSLoadingIcon show={loading}/>{children}</Button>
}

const ButtonStyled = styled(Buttons)`
    font-weight: 600;
    ${props => props.theme.button[props.disabled?4:(props.status || 0)]}
    /* border: 0rem none !important; */
    opacity: ${props => props.loading || props.disabled ? 0.75 : 1};
    &:before{
        border: 0rem none !important;
    }
    border-radius: ${p => p.square ? 1 : 10}rem  !important;
    text-transform: none !important;
    position: relative;
    ${p => p.w ? 'width:'+p.w + '%':''};
    &.MuiButton-root {
        /* font-size: 1.6rem; */
        font-size: ${p => p.theme.size[p.peak ? 0 : p.size || 1]}rem;
        padding: ${p => p.theme.padding[p.paddingType] || '.4rem 1.2rem'};
        min-width: auto;
        font-weight: 500;
    }
    &.MuiButton-root:hover {
        ${props => props.theme.button[props.disabled?4:(props.status || 0)]}
    }
    /* border: 1px solid rgba(0,0,0,0); */
    box-sizing: border-box;
    ${p => p.loading || p.disabled ? 'pointer-events:none':''};
`

const Left = css`
    &:after {
        top: 0;
        left: 0;
        border-top: 5rem solid transparent;
        border-bottom: 5rem solid transparent;
        border-left: 1rem solid  ${props => props.left};
        border-right: 5rem solid transparent;
    };
`

const Right = css`
    &:after {
        bottom: 0;
        right: 0;
        border-top: 5rem solid transparent;
        border-bottom: 5rem solid transparent;
        border-left: 5rem solid transparent;
        border-right: 1rem solid ${props => props.right};
    };
`

const BevelButtonStyled = styled(Button)`
    position: relative;
    opacity: ${props => props.active? 1: 0.6};
    z-index: 0;
    ${props => props.theme.button[props.status || 0]};
    width: 100%;
    border: 0rem none !important;
    &:before{
        border: 0rem none !important;
    }
`
export const BevelButton = styled(BevelButtonStyled)`
    /* display: contents; */
    overflow: initial;
    &:after {
        content: ' ';
        position: absolute;
        border-style: solid;
        width:100%;
        /* border-width: 4.2rem 1.2rem; */
        z-index: -1;
    };
    ${props => props.left?Left:''};
    ${props => props.right?Right:''};
`

export const Link = styled(Links)`
    ${props => props.theme.button[props.status || 0]};
    /* padding: 1rem; */
    display: block;
    border-radius: 1rem !important;
    text-align: center;
    font-size: ${p => p.theme.size[p.peak ? 0 : p.size || 1]}rem;
    padding: ${p => p.theme.padding[p.paddingType] || '.4rem 1.2rem'};
    min-width: auto;
    font-weight: 500;
    border-radius: ${p => p.square ? 1 : 10}rem  !important;
    /* line-height:  */
`


export default ButtonStyled

export function ChooseButtons({disabled, loading, size ,style, className, buttonClass, list, value, onChange = () => {}}) {
    const [actives, setActive] = useState(value || list[0].id)
    useEffect(() => {
        setActive(value)
    }, [value])
    const choose = useCallback( el => {
        let target = el.target
        while(!target.dataset.active) {
            target = target.parentElement
        }
        onChange(target.dataset.active)
        setActive(target.dataset.active)
    }, [])
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            ...style
        }} className={className}>
            {
                list.map( v => 
                    <ButtonStyled
                        disabled={v.disabled || disabled}
                        loading={loading}
                        size={size}
                        className={(buttonClass || '') + (actives == v.id?' active':'')}
                        style={{width: ((100 / list.length) *0.9) + '%'}}
                        key={v.id}
                        status={actives == v.id?0:3}
                        data-active={v.id}
                        onClick={choose}
                    >
                        {v.title}
                    </ButtonStyled>
                )
            }
        </div>
    )
}



export const TabStyled = styled(ChooseButtons)`
    .MuiButton-root {
        background: unset !important;
        font-weight: 600;
        font-size: 1.5rem;
        color: ${p => p.theme.color['1']} !important;
        border: 0px;
    }
    .MuiButton-root.active {
        position: relative;
        font-size: 1.6rem;
        color: #fff !important;
        &::before {
            position: absolute;
            content: '';
            border-radius: 2px !important;
            width: 90%;
            height: 2px;
            bottom: 0px;
            left: 5%;
            background: ${p => p.theme.button[0].background};
            transition: all 2s;
            -webkit-transition: all 2s;
        }
    }
`

export const CheckButton = ({className, style, checked, square, ...other}) => {
    return (
        <CheckBlock style={style} className={className}>
            <ButtonStyled {...other} status={3} square={square}/>
            {
                checked && square == true?
                    <CheckIcon>
                        <IconFont type='icon-a-Frame3163' size={10}/>
                    </CheckIcon>    
                    :null
            }
        </CheckBlock>
    )
}

const CheckIcon = styled.div`
    position: absolute;
    right: 0px;
    bottom: 1px;
    width: 18px;
    height: 14px;
    ${p => p.theme.block[0]};
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px 0px 10px 0px;
`

const CheckBlock = styled.div`
    position: relative;
    width: min-content;
`