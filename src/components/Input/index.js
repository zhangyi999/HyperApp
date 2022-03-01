/*
 * @Author: sam
 * @Date: 2021-06-26 14:13:13
 * @LastEditTime: 2021-07-11 18:42:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/Input/index.js
 */

import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import Input from '@material-ui/core/Input';


const useStyles = makeStyles((theme) => ({
    input: {
        padding: '0 .2rem',
        color: '#fff',
        fontWeight: 500,
        fontSize: '1.8rem',
        borderRadius: '6px'
    },
    // focused: {
    //     fontFamily: 'Montserrat script=latin rev=1 !important'
    // }
  }));

  
function InputBlock({before, after, className, input={}, ...other}) {
    const classes = useStyles()
    return (
        <Block className={className} {...other}>
            {before}
            <Input
                {...input}
                classes={classes}
                style={{color: input.readOnly?'#c6c6c6':'#fff',paddingLeft:'4px'}}
                // classes={classes}
                disableUnderline={true} 
            />
            {after}
        </Block>
    )
}

export default InputBlock

const Block = styled.div`
    /* background-color: rgba(0,0,0,0.2); */
    background-color: rgba(2,10,26,0.3);
    width: max-content;
    padding: 1rem .6rem;
    border-radius: 12px;
    /* border: 1px solid #f2f2f2; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    border-radius: 10px;
    .MuiInputBase-root {
        width: 100%;
    }
`
