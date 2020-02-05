import * as types from './ActionTypes'


export const handleInfo= (info) => {
    console.log("check handleInfo ",info)
    return {
        type: types.Info,
        income: info
    }
}
