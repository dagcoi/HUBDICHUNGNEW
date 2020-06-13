import * as types from '../action/ActionTypes'
const defaultState = {
    name: '',
    link_avatar: '',
    phone: '',
    email: '',
    pass: '',
    isLogin: 0,
    token: null,
}

const ReducerInfo = (state = defaultState, action) => {
    switch (action.type) {
        case types.ADD_INFO_USER:
            return {
                ...state,
                name: action.name,
                link_avatar: action.link_avatar,
                isLogin: action.isLogin,
            };

        case types.ADD_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        default:
            return state;
    }
}

export default ReducerInfo;
