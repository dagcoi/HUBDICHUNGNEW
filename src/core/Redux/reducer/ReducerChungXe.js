import * as types from '../action/ActionTypes'
const defaultStatecx = {
    rentDate: '',
    retunDate: '',
    city: '',
}

const ReducerChungXe = (state = defaultStatecx, action) => {
    switch (action.types) {

        case types.ADD_CITY_TIME:
            return {
                ...state,
                rentDate: action.rentDate, // giờ nhận xe
                retunDate: action.retunDate, // giờ trả xe
                city: action.city, // Chọn thành phố
            };
        default:
            return state;
    }
}

export default ReducerChungXe;