/*
 * @Author: sam
 * @Date: 2021-06-27 00:28:57
 * @LastEditTime: 2021-07-14 10:13:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/Table/Mobile.js
 */

import {NoData} from '../Coin'
import styled from 'styled-components'

// import {Hr} from '../'



// const Row = styled.div`
//     position: relative;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     box-sizing: border-box;
//     padding: 0 0 .6rem;
//     margin-bottom: .4rem;
//     &:before {
//         position: absolute;
//         content: '';
//         width: 100%;
//         height: 1px;
//         transform: scaleY(50%);
//         background-color: #e3e3e3;
//         bottom: 0;
//         left: 0;
//         display: ${p => p.line ? 'block': 'none'};
//     }
// `

const BlockRow = styled.div`
    padding: .6rem;
    border-radius: ${p => p.theme.borderRadius};
    background-color: ${p => p.theme.tableBackground};
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
`

const lineHeight = {
    lineHeight: '2.2rem',
    width: '100%'
}

function rowChild(row) {
    // console.log(
    //     row,'res'
    // )
    return row //row.props? row.props.children : row
}

// 处理交错
function MobileRow({subRender, rowStyle = {} ,head = [], list = [[]], rowRender = row => row}) {
    // const child = head.props? head.props.children : head
    return (
        <Farg>
        {
            list.length === 0?
            <NoData>No Position</NoData>:
            list.map((row, index) =>
                <Farg key={index+'1'}> 
                    <BlockRow style={rowStyle} key={index+'1'}>
                        <div style={lineHeight}>
                            {head}
                        </div>
                        <div style={lineHeight}>
                            {
                                // rowChild(rowRender(row))
                                rowRender(row)
                            }
                        </div>
                    </BlockRow>
                    {subRender && subRender(row, index)}
                </Farg>
            )
        }
        </Farg>
    )
}

// 左右分块
// function MobileRow({subRender, rowStyle = {} ,head = [], list = [[]], rowRender = row => row, line = true}) {
//     return (
//         <Farg>
//         {
//             list.map((row, index) =>
//                 <Farg key={index+'1'}> 
//                     <Row style={rowStyle}>
//                         {head}
//                         {rowRender(row)}
//                     </Row>
//                     {subRender && subRender(row, index)}
//                 </Farg>
//             )
//         }
//         </Farg>
//     )
// }

export default MobileRow

function Farg({children}) {
    return <>{children}</>
}