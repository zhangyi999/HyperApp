/*
 * @Author: sam
 * @Date: 2021-07-05 15:13:55
 * @LastEditTime: 2021-07-07 13:01:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/hook/useToast.js
 */

import { useSnackbar } from 'notistack'; 

import Icon from '../components/IconFont'
import { TextM, FlexBlock } from '../components';

// variant : 'default' | 'error' | 'success' | 'warning' | 'info';
function useToast( ) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (content) => {
    enqueueSnackbar(content);
  };

  const handleClickVariant = (content, variant='success') => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(
      <FlexBlock flex>
        <Icon type={variant==='success'?'icon-chenggong':'icon-cuowu1'} size='16' style={{marginRight:'6px'}}/>
        <TextM>{content}</TextM>
      </FlexBlock>
      , { variant: 'default' });
  };
  return {
    open: handleClickVariant,
    info: handleClick
  }
}

export default useToast