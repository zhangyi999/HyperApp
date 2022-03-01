import styled from 'styled-components'
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { makeStyles } from '@material-ui/core/styles';

// const useStylesFacebook = makeStyles((theme) => ({
//   top: {
//     color: '#fdb756',
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     marginLeft: '-20px',
//     marginTop: '-20px'
//   }
// }));

const ImgBagel = styled.img`
  width: 30%;
  margin: auto;
  margin-left: 35%;
`

const ShowBlock = styled.div`
  animation: show .3s;
  @keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
  }
`

const LoadBlock = styled.div`
  /* position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0A111D; */
  width: 100%;
  position: absolute;
  top: 35%;
  /* left: 35%; */
  /* margin-top: -50px;
  margin-left: -50px; */
  /* text-align: center;
  animation-duration: 1s; // 一个完整动画的持续时间
  animation-iteration-count: infinite; // 动画循环次数：无限循环
  animation-name: heart-bounce; // 调用的动画名，对应上面的 .heart-bounce
  @keyframes heart-bounce {
    from {transform: scale(1); }
    12% {transform: scale(1.02); }
    20% {transform: scale(0.99); }
    28% {transform: scale(0.98); }
    32% {transform: scale(1.2); }
    38% {transform: scale(0.96); }
    50% {transform: scale(1); }
    58% {transform: scale(0.98); }
    70% {transform: scale(0.9); }
    80% {transform: scale(0.98); }
    to {transform: scale(1); }
  } */

`

const P = styled.p`
  /* position: absolute;
  bottom: 20px; */
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 25px;
  color: #fff; 
`

const Loader = styled.i`
  --color: white;
  --size-mid: 6vmin;
  --size-dot: 1.5vmin;
  --size-bar: 0.4vmin;
  --size-square: 3vmin;
  
  display: block;
  position: relative;
  width: 50%;
  display: grid;
  place-items: center;
  margin-left: 25%;

  &::before,
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
  }
  /**
    loader --4
  **/
    &::before {
    height: var(--size-bar);
    width: 6vmin;
    background-color: var(--color);
    animation: loader-4 0.8s cubic-bezier(0, 0, 0.03, 0.9) infinite;
  }

  @keyframes loader-4 {
    0%, 44%, 88.1%, 100% {
      transform-origin: left;
    }
    
    0%, 100%, 88% {
      transform: scaleX(0);
    }
    
    44.1%, 88% {
      transform-origin: right;
    }
    
    33%, 44% {
      transform: scaleX(1);
    }
  }
`

function Loading() {
  // const classes = useStylesFacebook()
  // return <CircularProgress className={classes.top} disableShrink color="#fdb756" />
  return <ImgBagel src='./logo.svg'/>
}

export default function AwaitReady({children, ready=true}) {
  return ready? <ShowBlock>{children}</ShowBlock> :
    <LoadBlock>
      <Loading />
      <P>Meer Defi</P>
      <Loader />
    </LoadBlock>
}