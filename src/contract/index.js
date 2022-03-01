export const isDev = true

let constants = null

export const initConstants = async net => {
    constants = await import(`./constants/${isDev?'dev':'main'}.${net}.json`)
}

export const getConstants = () => constants