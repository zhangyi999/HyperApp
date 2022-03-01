
import useButtonText from './useButtonText'
import useToast from './useToast'
import useCheckTransaction from './useCheckTransaction'



function useSendButton(initButtonText) {
    const {
        button,
        loadingButton,
        initButton
    } = useButtonText(initButtonText)
    const {open} = useToast()
    const {openTx} = useCheckTransaction()

    return {
        button,
        loading: loadingButton,
        init: initButton,
        txError: info => openTx('fail', info),
        fail: info => open(info, 'error'),
        successful: info => open(info)
    }
}

export default useSendButton