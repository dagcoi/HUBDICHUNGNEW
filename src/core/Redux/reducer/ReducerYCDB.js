import * as types from '../action/ActionTypes'
const defaultState = {
    pick_add: '',
    component_pick: '',
    lattitude_pick: '',
    lngtitude_pick: '',
}
const ReducerYCDB = (state = defaultState, action) => {
    switch (action.type) {

        case types.PICK_ADDRESS_YCDB:
            return {
                ...state,
                pick_add: action.address,
                component_pick: action.address_component,
                lattitude_pick: action.lattitude_pick,
                lngtitude_pick: action.lngtitude_pick,
            };

        default:
            return state;
    }

};
export default ReducerYCDB;