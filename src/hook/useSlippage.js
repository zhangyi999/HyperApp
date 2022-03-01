import { useContext } from 'react'

import {SlippageContext} from '../context'


function useSlippage( ) {
    return useContext(SlippageContext)
}

export default useSlippage