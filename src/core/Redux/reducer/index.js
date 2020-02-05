import { combineReducers } from 'redux';
import Reducer from './Reducer';
// import ReducerCX from './ReducerCX';

const reducer = combineReducers({
    info : Reducer,

    // infoCX : ReducerCX,

});

export default reducer;