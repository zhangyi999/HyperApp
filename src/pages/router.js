// import Deposit from './Deposit'
// import Claim from './Claim'
// import Withdraw from './Withdraw'

import Swap from "./Swap";

import Liquidity from "./Liquidity";
import MyLiquidity from "./MyLiquidity";
import Vote from "./Vote";
import AddLiquidity from "./AddLiquidity";

// import Test from './Test'

// import Energy from './Energy'

export const Done = [
  {
    title: "兑换",
    path: "/",
    exact: true,
    component: Swap,
  },
  {
    title: "流动池",
    path: "/liquidity",
    // exact: true,
    component: Liquidity,
  },

  // {
  //     title: 'test',
  //     path: '/test',
  //     // exact: true,
  //     component: Test
  // },

  {
    title: "投票",
    path: "/vote",
    // exact: true,
    component: Vote,
  },

  // {
  //     title: 'Deposit',
  //     path: '/deposit',
  //     component: Deposit
  // },
  // {
  //     title: 'Claim',
  //     path: '/claim',
  //     component: Claim
  // },
  // {
  //     title: 'Withdraw',
  //     path: '/withdraw',
  //     component: Withdraw
  // }
];

export const Dev = [
  {
    title: "管理流动性",
    path: "/my_liquidity",
    // exact: true,
    component: MyLiquidity,
  },
  {
    title: "添加流动性",
    path: "/add_liquidity",
    // exact: true,
    component: AddLiquidity,
  },
];
