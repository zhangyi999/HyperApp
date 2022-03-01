import { useCallback } from 'react'

import {useTransactionDialog} from '../context/TransactionDialog'

function useCheckTransaction(content) {
    const transactionDialog = useTransactionDialog()
    const openTx = useCallback((type , newContent) => {
        transactionDialog.openTransaction(type , newContent || content)
    }, [content, transactionDialog.openTransaction])
    const closeTx = transactionDialog.closeTransaction
    return {
        openTx,
        closeTx,
        changeStatus: transactionDialog.changeStatus
    }
}

export default useCheckTransaction