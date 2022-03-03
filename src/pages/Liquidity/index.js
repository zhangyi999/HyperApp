import styled from 'styled-components'

import {
    Card,
    Icon,
    TextM,
    TextSM,
    TextMD,
    Input,
    WhiteSpace,
    Coin,
    HrDotted,
    WingBlank,
    Button,
    Table,
    HeadBlock,
    RowBlock,
    Fragment,
    Link
} from '../../components'

import PageBlock from '../../pageComponents/PageBlock'

// [name, 基础收益率, 奖励收益范围, 交易量, 美元价值, 可领取奖励, 池子 ID]
const POOL_LIST = [
  ["3 Alpaca", 1, [1.61, 4.02], 4.02, 1000, 5.24, 0],
  ["3 Alpaca", 1, [1.61, 4.02], 4.02, 1000, 5.24, 0],
  ["3 Alpaca", 1, [1.61, 4.02], 4.02, 1000, 5.24, 0],
  ["3 Alpaca", 1, [1.61, 4.02], 4.02, 1000, 5.24, 0],
];

function LiquidityRow({ row }) {
  return (
    <Fragment>
      <RowBlock w={12}>{row[0]}</RowBlock>
      <RowBlock w={13}>{row[1]}</RowBlock>
      <RowBlock w={15}>
        {row[2][0]} -{">"} {row[2][1]}
      </RowBlock>
      <RowBlock w={12.5}>{row[3]}</RowBlock>
      <RowBlock w={12.5}>{row[4]}</RowBlock>
      <RowBlock w={12.5}>{row[5]}</RowBlock>
      <RowBlock w={22.5} flex>
        <Link size="0" to="/my_liquidity">
          领取奖励
        </Link>
        <WingBlank />
        <Link size="0" status="5" to="/my_liquidity">
          管理流动性
        </Link>
      </RowBlock>
    </Fragment>
  );
}

function Liquidity() {
    return (
        <PageBlock>
            <Card
                b='1'
                // w='80'
            >
                <Table
                    rowStyle={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '10px',
                        marginTop: '1rem'
                    }}
                    head={
                        <Fragment>
                            <HeadBlock w={12}>
                                流动池
                            </HeadBlock>
                            <HeadBlock w={13}>
                                基础收益
                            </HeadBlock>
                            <HeadBlock w={15}>
                                奖励收益
                            </HeadBlock>
                            <HeadBlock w={12.5}>
                                交易额
                            </HeadBlock>
                            <HeadBlock w={12.5}>
                                美元价值
                            </HeadBlock>
                            <HeadBlock w={12.5}>
                                可用奖励
                            </HeadBlock>
                            <HeadBlock w={22.5}>
                                操作
                            </HeadBlock>
                        </Fragment>
                    }
                    list={POOL_LIST}
                    rowRender={v => <LiquidityRow row={v}/>}
                />
            </Card>
        </PageBlock>
    )
}

export default Liquidity