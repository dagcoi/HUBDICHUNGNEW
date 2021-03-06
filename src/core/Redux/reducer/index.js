import { combineReducers } from 'redux';
import Reducer from './Reducer';
import ReducerChungXe from './ReducerChungXe';
import ReducerTaiXe from './ReducerTaiXe'
import ReducerVanChuyen from './ReducerVanChuyen'
import ReducerTuLai from './ReducerTuLai'
import ReducerYCDB from './ReducerYCDB'
import ReducerInfo from './ReducerInfo'
import ReducerModal from './ReducerModal'

const reducer = combineReducers({
    info: Reducer,
    infoCX: ReducerChungXe,
    rdTaixe: ReducerTaiXe,
    rdVanChuyen: ReducerVanChuyen,
    rdTuLai: ReducerTuLai,
    dacbiet: ReducerYCDB,
    thongtin: ReducerInfo,
    modal : ReducerModal,
});

export default reducer;