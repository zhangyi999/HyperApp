export const isDev = true

let constants = null

export const initConstants = async net => {
    constants = await import(`./${net}.js`)
}

export const getConstants = () => constants