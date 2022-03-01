/*
 * @Author: sam
 * @Date: 2020-12-22 11:16:00
 * @LastEditTime: 2021-06-27 18:11:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/IconFont/index.js
 */
// import classnames from 'classnames';
import styled from 'styled-components';
// import './index.css'
// import {ALI_ICON} from '../../config.js'

const scriptElem = document.createElement('script');
scriptElem.src =  './icon.js'//ALI_ICON;
document.body.appendChild(scriptElem);

function SuperIcon({ className, type, ...restProps }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      {...restProps}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}

const IconStyled = styled(SuperIcon)`
  width: ${props => props.size ? props.size+ 'px' : '22px'};
  height: ${props => props.size ? props.size+ 'px' : '22px'};
  vertical-align: -0.15rem;
  fill: currentColor;
  overflow: hidden;
  min-width: ${props => props.size ? props.size+ 'px' : '22px'};
`

export default IconStyled;

export const Nothing = ({className}) => <SuperIcon className={className} size='1.2' type='icon-kongshuju'/>

export const TipsIcon = ({type, ...other}) => <IconStyled size='1' style={{marginLeft:'.2rem',verticalAlign:'0.15rem',color: 'rgb(114, 39, 35)'}} {...other} type={type}/>

export const I = (other) => <IconStyled style={{marginLeft:'4px',verticalAlign:'0',width:'16px'}} {...other} type='icon-prompt'/>