/*
 * @Author: sam
 * @Date: 2021-06-28 01:56:19
 * @LastEditTime: 2021-06-28 02:18:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/hook/useOnClick.js
 */

function useOnClick(key, call = () => {}) {

    const onClick = el => {
        if ( !el.target ) return
        let target = el.target
        while (!target.dataset[key]) {
            target = target.parentElement
        }
        call(target.dataset[key] === 'useOnClick'? null : target.dataset[key])
    }
    
    return {
        ['data-'+key]: 'useOnClick',
        onClick
    }
}

export default  useOnClick