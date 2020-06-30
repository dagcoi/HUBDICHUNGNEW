import * as types from '../action/ActionTypes'
const defaultState = {
    pick_add: '',
    component_pick: '',
    latitude_pick: '',
    longitude_pick: '',
}
const ReducerYCDB = (state = defaultState, action) => {
    switch (action.type) {

        case types.PICK_ADDRESS_YCDB:
            return {
                ...state,
                pick_add: action.address,
                component_pick: action.address_component,
                latitude_pick: action.latitude_pick,
                longitude_pick: action.longitude_pick,
            };

        default:
            return state;
    }

};
export default ReducerYCDB;