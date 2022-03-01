
import {ERC20} from "../web3";
import {getConstants} from './constants' 

const USD = () => {
    const {USDT} = getConstants()
    return ERC20(USDT[0]) 
}

export default USD

export const getUSDTAddress = () => getConstants().USDT