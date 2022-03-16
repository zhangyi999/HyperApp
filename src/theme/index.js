import { createTheme } from "@material-ui/core";

export const inPc = (() => {
  var sUserAgent = navigator.userAgent;
  if (
    sUserAgent.indexOf("Android") > -1 ||
    sUserAgent.indexOf("iPhone") > -1 ||
    sUserAgent.indexOf("iPad") > -1 ||
    sUserAgent.indexOf("iPod") > -1 ||
    sUserAgent.indexOf("Symbian") > -1
  ) {
    return false;
  } else {
    return true;
  }
})();

function linearGradient(deg, start, stop) {
  return `linear-gradient(${deg}deg,  ${start}, ${stop})`;
}

function shadow(color) {
  return `0px 0px .4rem ${color}`;
}

// card
// block input
// text
// button
// alert
// draw

// size
// background
// border
// linear-gradient(0, #4927d4, #9916b6)
const background = [
  {
    background: linearGradient(90, "#4927d4", "#9916b6"),
  },
  {
    background: linearGradient(90, "#F44459", "#A705FD"),
  },
  {
    background: "#090A46",
  },
  // {
  //     border: '0.18rem solid transparent',
  //     backgroundClip: 'padding-box, border-box',
  //     backgroundOrigin: 'padding-box, border-box',
  //     backgroundImage: `linear-gradient(to right, #0e0f35, #0e0f35),${linearGradient(265.06, '#03FFF0', '#6271FF')}`
  // },
  {
    background: "rgba(37, 9, 70, .38)",
  },
  {
    background: "rgba(0,0,0,.3)",
  },
  {
    background: "#202228",
  },
  {
    background: "#05061B",
  },
  {
    background: linearGradient(265.06, "#f4d244", "#fd8805"),
  },
];

const color = ["#FFFFFF", "#a38bf0", "#bebfc8", "#9D9D9D", "#9da5ad", "#000"];

const size = [1.2, 1.6, 2.2, 3.2, 5.2, 8.7];

const theme = {
  // public
  MAX_WIDTH: 1080,
  isPc: inPc,
  body: "radial-gradient(farthest-corner at 70% 60%,#a65dd1 1%,#3f1662 60%)",
  tableBackground: "#f2f2f2",
  footerHeight: "5.2rem",
  borderRadius: "16px",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1);",
  active: "#F3503C",
  // font
  size,
  padding: size.map((v) => `${v * 0.618}rem ${v}rem`),
  // 由亮 到 暗
  // 字体颜色
  color,
  // 由 亮 变 暗
  block: [
    background[0],
    background[3],
    background[4],
    background[5],
    background[6],
  ],
  draw: background[2],
  // 由 亮 变 暗
  button: [
    {
      ...background[0],
      color: color[0],
    },
    {
      ...background[1],
      color: color[0],
    },
    {
      ...background[7],
      color: color[0],
    },
    {
      ...background[3],
      color: color[0],
    },
    // disabled
    {
      ...background[4],
      color: color[4] + " !important",
      // border: '1px solid #575c89'
    },
    // uncheck
    {
      ...background[4],
      color: color[2],
      border: "1px solid #575c89",
    },
  ],
};

export default theme;
