
async function initDate(asyncFun, setFun) {
    setFun(await asyncFun())
}

export default initDate