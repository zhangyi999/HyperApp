/*
 * @Author: sam
 * @Date: 2021-06-25 14:50:20
 * @LastEditTime: 2021-06-25 15:16:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/Dialog/index.js
 */

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

import {inPc} from '../../theme'

const useStyles = makeStyles({
    paper: {
      borderRadius: 24,
      background: 'none',
      // maxWidth: 'calc(100% - 32px) !important',
      // width: 'calc(100% - 32px) !important'
    },
    paperFullWidth : {
      maxWidth: "calc(100% - 24px) !important",
      width: "calc(100% - 24px)",
      margin: "6px !important",
      boxShadow: "0px 0px 20px rgba(0,0,0,.9)"
    }
  });

function Dialogs(props) {
    const classes = useStyles()
    return (
        <Dialog {...props} classes={{
          paper: classes.paper,
          paperFullWidth: inPc? null:classes.paperFullWidth
        }}/>
    )
}

export default Dialogs