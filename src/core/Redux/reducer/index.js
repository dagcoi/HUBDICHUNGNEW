import { combineReducers } from 'redux';
import Reducer from './Reducer';
import ReducerChungXe from './ReducerChungXe';
import ReducerTaiXe from './ReducerTaiXe'
import ReducerVanChuyen from './ReducerVanChuyen'

const reducer = combineReducers({
    info : Reducer,
    infoCX : ReducerChungXe,
    rdTaixe : ReducerTaiXe,
    rdVanChuyen : ReducerVanChuyen,
});

export default reducer;