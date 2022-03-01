/*
 * @Author: sam
 * @Date: 2021-06-28 11:56:52
 * @LastEditTime: 2021-07-11 21:48:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/Tooltip/index.js
 */
import { useState } from 'react';

import styled from 'styled-components'

import {makeStyles} from "@material-ui/styles";
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles({
  tooltipPlacementLeft : {
    margin: '0px 8px'
  },
  tooltipPlacementRight: {
    margin: '0px 8px'
  },
  tooltipPlacementTop: {
    margin: '8px 0px'
  },
  tooltipPlacementBottom: {
    margin: '8px 0px'
  },
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  arrow: {
    color: 'rgba(0,0,0,0.9)'
  }
});


function MobileTooltip ({children, className, w, style,...other}) {

  const classes = useStyles()

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
            {...other}
            classes={classes}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
        >
        <Block w={w} style={style} className={className} onClick={handleTooltipOpen}>
            {children}
        </Block>
        </Tooltip>
    </ClickAwayListener>
  )
  
}

export default MobileTooltip

const Block = styled.div`
  display: inline-block;
  width: ${p => p.w ? p.w + '%' : 'max-content'};
  cursor: default;
  /* margin-right: auto;
  margin-left: auto; */
`