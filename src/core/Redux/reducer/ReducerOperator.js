import { act } from 'react-test-renderer';
import * as types from '../action/ActionTypes'
const defaultStateOperator = {
    itemCarOperator: null,
    modalCarTypeOperator: false,
    itemConfirm: null,
    modalConfirm: false,
    idTimePick: null,
    modalTimePick: false,
    idTimeDrop: null,
    modalTimeDrop: false,
    timePick: '',
    timeDrop: '',
    listDaySelect: [],
    sendDataOperator: null,
    itemCity: null,
    modalCity: false,
    itemTransmission: null,
    modalTransmission: false,
    itemVehicle: null,
    modalVehicle: false,
    itemSlot: null,
    modalSlot: false,
}
const ReducerOperator = (state = defaultStateOperator, action) => {
    switch (action.type) {
        case types.ADD_ITEM_CAR_TYPE:
            return {
                ...state,
                itemCarOperator: action.itemCarOperator,
                modalCarTypeOperator: action.modalCarTypeOperator,
            }
        case types.SHOW_MODAL_CAR_OPERATOR:
            return {
                ...state,
                modalCarTypeOperator: action.modalCarTypeOperator,
            }
        case types.SHOW_MODAL_TIME_PICK:
            return {
                ...state,
                modalTimePick: action.modalTimePick
            }
        case types.SHOW_MODAL_TIME_DROP:
            return {
                ...state,
                modalTimeDrop: action.modalTimeDrop
            }
        case types.ADD_TIME_PICK:
            return {
                ...state,
                idTimePick: action.idTimePick,
                timePick: action.timePick,
                modalTimePick: action.modalTimePick
            }
        case types.ADD_TIME_DROP:
            return {
                ...state,
                idTimeDrop: action.idTimeDrop,
                timeDrop: action.timeDrop,
                modalTimeDrop: action.modalTimeDrop
            }
        case types.ADD_ITEM_CONFIRM:
            return {
                ...state,
                itemConfirm: action.itemConfirm,
                modalConfirm: action.modalConfirm,
            }
        case types.SHOW_MODAL_CONFIRM:
            return {
                ...state,
                modalConfirm: action.modalConfirm,
            }

        case types.LIST_DAY_OF_WEEK:
            return {
                ...state,
                listDaySelect: action.listDaySelect,
            }
        case types.ADD_DATA_SEND_OPERATOR:
            return {
                ...state,
                sendDataOperator: action.sendDataOperator,
            }

        case types.ADD_ITEM_CITY:
            return {
                ...state,
                itemCity: action.itemCity,
                modalCity: action.modalCity,
            }
        case types.SHOW_MODAL_CITY:
            return {
                ...state,
                modalCity: action.modalCity,
            }
        case types.ADD_ITEM_TRANSMISSION:
            return {
                ...state,
                itemTransmission: action.itemTransmission,
                modalTransmission: action.modalTransmission,
            }
        case types.SHOW_MODAL_TRANSMISSION:
            return {
                ...state,
                modalTransmission: action.modalTransmission,
            }
        case types.ADD_ITEM_VEHICLE:
            return {
                ...state,
                itemVehicle: action.itemVehicle,
                modalVehicle: action.modalVehicle,
                itemSlot: action.itemSlot,
            }
        case types.SHOW_MODAL_VEHICLE:
            return {
                ...state,
                modalVehicle: action.modalVehicle,
            }
        case types.ADD_ITEM_SLOT:
            return {
                ...state,
                itemSlot: action.itemSlot,
                modalSlot: action.modalSlot,
            }
        case types.SHOW_MODAL_SLOT:
            return {
                ...state,
                modalSlot: action.modalSlot,
            }

        default:
            return state;
    }

};
export default ReducerOperator;