/*
 * @Author: sam
 * @Date: 2021-06-27 00:28:33
 * @LastEditTime: 2021-06-28 00:26:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/Table/index.js
 */

import {inPc} from '../../theme'
import MobileRow from './Mobile'
import PC from './PC'

function Table(props) {
    return (
        <>
            {
                inPc? <PC {...props} />: <MobileRow {...props} />
            }
        </>
    )
}

export default Table

