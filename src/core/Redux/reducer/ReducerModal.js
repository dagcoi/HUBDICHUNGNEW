import * as types from '../action/ActionTypes'
const defaultStateModal = {
    ishow: false,
}

const ReducerModal = (state = defaultStateModal, action) => {
    switch (action.types) {

        case types.ADD_MODAL:
            return {
                ...state,
                ishow: action.ishow, 
            };
        default:
            return state;
    }
}

export default ReducerModal;