import { memo } from "react"

import styled from "styled-components"

const Container = styled.div`
    height: 6px;
    background: rgba(2,10,26,0.3);
    border-radius: 100px;
    overflow: hidden;
    .xcprogress-bar {
        width: 0;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: #3aa1ce;
        background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
        background-size: 40px 40px;
        transition: width .6s ease;
        border-radius: 4px;
        animation: xcprogress-bar-anim 2s linear infinite;
    }

    .xcprogress-bar-value {
        font-size: 13px;
        font-weight: bold;
        color: white;
        margin-right: 5px;
    }

    @keyframes xcprogress-bar-anim {
        from {
            background-position: 40px 0;
        }

        to {
            background-position: 0 0;
        }
    }
`

function LineLoading({size, children, ...orther}) {
    return (
        <Container {...orther}>
            <div className="xcprogress-bar" style={{width:Math.min(size*1, 100)+'%'}}>
                <div className="xcprogress-bar-value">{children}</div>                       
            </div>
        </Container>
    )
}

export default memo(LineLoading)
