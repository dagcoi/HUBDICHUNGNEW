import * as types from '../action/ActionTypes'
const defaultStatecx = {
    rentDate: '',
    retunDate: '',
    city: '',
}

const Reducer = (state = defaultStatecx, action) => {
    switch (action.types) {

        case types.ADD_CITY_TIME:
            return {
                ...state,
                rentDate: action.rentDate,
                retunDate: action.retunDate,
                city: action.city,
            };
    }
}