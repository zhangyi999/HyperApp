/*
 * @Author: sam
 * @Date: 2021-06-25 15:16:53
 * @LastEditTime: 2021-07-30 00:26:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/src/components/Coin/index.js
 */

import styled from "styled-components";

import IconFont from "../IconFont";

const coinType = {
  usdt: "icon-celvexiaotubiao-03",
  usdc: "icon-celvexiaotubiao-05",
  husd: "icon-celvexiaotubiao-01",
  busd: "icon-a-image2vector5",
  dai: "icon-a-image2vector4",
  eth: "icon-celvexiaotubiao-04",
  mdx: "icon-celvexiaotubiao-12",
  btc: "icon-celvexiaotubiao-07",
  fil: "icon-celvexiaotubiao-08",
  bnb: "icon-a-image2vector5",
  ht: "icon-celvexiaotubiao-14",
  dot: "icon-celvexiaotubiao-15",
  afil: "icon-alFIL",
  stkfil: "icon-stkFIL",
  vault: "icon-shandian",
  meer: "icon-a-bianzu2",
};

function Coin({ type = "", className, size = 26, style }) {
  return (
    <IconFont
      style={style}
      size={size}
      type={coinType[type.toLocaleLowerCase()]}
      className={className}
    />
  );
}

const NAME_WALLET = {
  imtoken: "icon-imtoken",
  metamask: "icon-metamask",
  walletconnect: "icon-WalletConnect",
};
export const WalletIcon = ({ name, ...other }) => (
  <IconFont
    type={NAME_WALLET[(name || "").toLocaleLowerCase()] || "icon-qianbao"}
    {...other}
  />
);

export function NoData(props) {
  return (
    <div
      style={{
        margin: "auto",
        width: "fit-content",
        padding: "2rem 0 1.4rem",
        textAlign: "center",
      }}
    >
      <IconFont type="icon-meiyoushuju" size="60" {...props} />
      {props.children ? (
        <p style={{ color: "#888" }}>{props.children}</p>
      ) : null}
    </div>
  );
}

export default Coin;

export function Coins({ className, types = [], size }) {
  return (
    <CoinsBlock className={className}>
      {types.map((v) => (
        <Coin key={v} type={v} size={size} />
      ))}
    </CoinsBlock>
  );
}

const CoinsBlock = styled.div`
  display: ${(p) => (p.block ? "block" : "inline-block")};
  ${IconFont} {
    margin-right: -10%;
  }
  ${IconFont}:last-of-type {
    margin-right: 0%;
  }
`;
