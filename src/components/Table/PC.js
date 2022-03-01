/*
 * @Author: sam
 * @Date: 2021-06-27 00:29:03
 * @LastEditTime: 2021-07-14 10:12:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/Table/PC.js
 */
// import 

import {NoData} from '../Coin'

import styled from 'styled-components'

const Flex = styled.div`
    display: flex;
    padding: 1rem 0;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

`

function Head({head = []}) {
    return (
        <Flex>
            {head}
        </Flex>
    )
}

function PC({subRender, rowStyle = {} ,head = [], list = [[]], rowRender = row => row}) {
    return (
        <>
            <Head head={head}/>
            {
                list.length === 0 ?
                <NoData>No Position</NoData>:
                list.map( (row, index) => 
                    <div key={index+'1'}>
                        <Flex style={rowStyle} >
                            {rowRender(row)}
                        </Flex>
                        {subRender && subRender(row, index)}
                    </div>
                )
            }
            
        </>
    )
}

export default PC