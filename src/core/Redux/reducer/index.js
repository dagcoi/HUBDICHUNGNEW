import { combineReducers } from 'redux';
import Reducer from './Reducer';
import ReducerChungXe from './ReducerChungXe';
import ReducerTaiXe from './ReducerTaiXe'
import ReducerVanChuyen from './ReducerVanChuyen'
import ReducerYCDB from './ReducerYCDB'

const reducer = combineReducers({
    info : Reducer,
    infoCX : ReducerChungXe,
    rdTaixe : ReducerTaiXe,
    rdVanChuyen : ReducerVanChuyen,
    dacbiet : ReducerYCDB,
});

export default reducer;