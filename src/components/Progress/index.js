/*
 * @Author: sam
 * @Date: 2021-06-27 19:10:49
 * @LastEditTime: 2021-07-07 01:06:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/pages/components/Poss/index.js
 */

import styled from 'styled-components'

// import { withStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// const color = value => {
//   let colorer;
//   if ( value >=0 && value < 30 ) {
//     colorer= '#C1053F';
//   }
//   else if ( value >=50 && value < 90 ) {
//     colorer= '#ffc107';
//   }
//   else if ( value >=30 && value < 50 ) {
//     colorer= '#ff5722';
//   } else {
//     colorer= '#8bc34a';
//   }
//   return colorer
// }

const color = value => {
  let colorer;
  if ( value >=0 && value < 50 ) {
    colorer= '#8bc34a';
  }
  else if ( value >=50 && value < 80 ) {
    colorer= '#ffc107';
  }
  // else if ( value >=30 && value < 50 ) {
  //   colorer= '#ffc107';
  // }
  else {
    
    colorer= '#ff5722';
  }
  return colorer
}

const BorderLinearProgress = withStyles((theme) => {
  return {
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      // backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 300 : 700],
      backgroundColor: '#ededed'
    },
    bar: {
      borderRadius: 5,
      // backgroundColor: '#C1053F',
    }
  }
})(LinearProgress);

const StyledBorderLinearProgress = styled(BorderLinearProgress)`
  .MuiLinearProgress-barColorPrimary {
    background-color: ${p => p.bcolor || color(p.value)};
  }
  flex-grow: 1;
  width: ${p => p.w || 100}%;
`

export default function CustomizedProgressBars({className, bcolor , w, value = 0}) {
  return (
    <StyledBorderLinearProgress
        bcolor={bcolor}
        w={w}
        className={className}
        // classes={style.bar}
        variant="determinate"
        value={value}
        // barColorPrimary={color(value)}
        // color={color(value)}
      />
  );
}