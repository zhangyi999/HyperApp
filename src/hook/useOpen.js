import {useState} from 'react'

function useOpen(defaultStatus = false) {
    const [open, setOpen] = useState(defaultStatus) 
    return {
        isOpen: open,
        check() {
            setOpen(v => !v)
        }
    }
}

export default useOpen