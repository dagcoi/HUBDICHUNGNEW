import * as types from '../action/ActionTypes'
const defaultState = {
    plane_number: '',
    plane_type: '',
    catch_in_house: '1',
    email: '',
    pay_method_id: '3',
    ignore_duplicate_warning: '1',
    brand_partner_id: '',
    unmerged_select: '',
    pick_add: '',
    drop_add: '',
    component_drop: '',
    component_pick: '',
    merged_format: 'merged_format',
    chunk_id: 0,
    vehice_id: 'vehice_id',
    village_id: 'village_id',
    pm_id: 'pm_id',
    partner_id_1: 'partner_id_1',
    partner_name: '',
    city_id: 'city_id',
    drawer_open: false,
    vehicle_name: '',
    full_name: '',
    use_phone: '',
    full_name2: '',
    use_phone2: '',
    email2: '',
    payment: 0,
    agent_additi: 0,
    vat: false,
    toll_fee: '',
    comment: '',
    promotion_code: '',
    dimension_id: '1',
    vehicle_id: '0',
    ride_method_id: '2',
    chair: '1',
    xhd: '0',
    use_range_time: '',
    ticket_session: 'BOOKING_MAIN',
    source: 'https://dichung.vn',
    not_use: '',
    airport_id: '',
    street_id: '',
    village_id: '',
    depart_time: '',
    lattitude_pick: '',
    lngtitude_pick: '',
    lattitude_drop: '',
    lngtitude_drop: '',
    is_from_airport: 'false',
    merged: 0,
    session_id: '2idd3e6t7q4p9athmubh2a2jr2',
    transport_partner_id: '85',
    pick_pos: '',
    drop_pos: '',
    use_range_time: 0,
    unmerged: 0,
    company_name: '',
    company_address: '',
    company_mst: '',
    company_address_receive: '',
    not_use: 1,
    swap_add: '',
    component_swap: '',
    lattitude_swap: '',
    lngtitude_swap: '',
    vehicle_icon: '',
    discount_price: 0,
    rent_date: '',
    retun_date: '',
    city: '',
    city_name: '',
    time_pick: '',
    time_drop: '',
    duration: 6,
    extra_price_km_format: '',
    extra_price_hour_format: '',
    km_limit_format: '',
}
const ReducerTuLai = (state = defaultState, action) => {
    switch (action.type) {

        case types.PICK_ADDRESS_TULAI:
            return {
                ...state,
                pick_add: action.address,
                component_pick: action.address_component,
                lattitude_pick: action.lattitude_pick,
                lngtitude_pick: action.lngtitude_pick,
            };

        case types.DROP_ADDRESS_TULAI:
            return {
                ...state,
                drop_add: action.address,
                component_drop: action.address_component,
                lattitude_drop: action.lattitude_drop,
                lngtitude_drop: action.lngtitude_drop,
            }

        case types.TRIP_INFOMATION_TULAI:
            return {
                ...state,
                partner_name: action.partner_name,
                merged: action.merged,
                depart_time: action.depart_time,
                chunk_id: action.chunk_id,
                vehice_id: action.vehice_id,
                village_id: action.village_id,
                pm_id: action.pm_id,
                brand_partner_id: action.brand_partner_id,
                city_id: action.city_id,
                vehicle_name: action.vehicle_name,
                toll_fee: action.toll_fee,
                dimension_id: action.dimension_id,
                vehicle_id: action.vehicle_id,
                ride_method_id: action.ride_method_id,
                chair: action.chair,
                airport_id: action.airport_id,
                street_id: action.street_id,
                vehicle_icon: action.vehicle_icon,
                pick_pos: action.pick_pos,
                drop_pos: action.drop_pos,
                use_range_time: action.use_range_time,
                unmerged: action.unmerged,
            }

        case types.TIME_PICK_TULAI:
            return {
                ...state,
                depart_time: action.depart_time,
            }

        case types.ADD_CHAIR_TULAI:
            return {
                ...state,
                chair: action.chair,
            }

        case types.ADD_PEOPLE1_TULAI:
            return {
                ...state,
                full_name: action.full_name,
                use_phone: action.use_phone,
                email: action.email,
            }

        case types.ADD_PEOPLE2_TULAI:
            return {
                ...state,
                full_name2: action.full_name,
                use_phone2: action.use_phone,
                email2: action.email,
            }

        // case types.ADD_IS_FROM_AIRPORT_:
        //     return {
        //         ...state,
        //         is_from_airport: action.is_from_airport,
        //     }
        // case types.ADD_INFO_FLIGHT:
        //     return {
        //         ...state,
        //         plane_number: action.plane_number,
        //         plane_type: action.plane_type,
        //     }
        case types.ADD_COMPANY_TULAI:
            return {
                ...state,
                xhd: action.xhd,
                company_name: action.company_name,
                company_address: action.company_address,
                company_mst: action.company_mst,
                company_address_receive: action.company_address_receive,
            }

        case types.ADD_PROMOTION_CODE_TULAI:
            return {
                ...state,
                promotion_code: action.promotion_code,
                discount_price: action.discount_price,
            }
        case types.SWAP_ADDRESS_TULAI:
            return {
                ...state,
                pick_add: action.pick_address,
                component_pick: action.pick_address_component,
                lattitude_pick: action.lattitude_pick,
                lngtitude_pick: action.lngtitude_pick,
                drop_add: action.drop_address,
                component_drop: action.drop_address_component,
                lattitude_drop: action.lattitude_drop,
                lngtitude_drop: action.lngtitude_drop,
            }

        case types.ADD_CITY_TIME_TULAI:
            return {
                ...state,
                rent_date: action.rent_date,
                retun_date: action.retun_date,
                city: action.city,
                city_name: action.city_name,
                time_pick: action.time_pick,
                time_drop: action.time_drop,
            };
        case types.ADD_PAY_METHOD_ID_TULAI:
            return {
                ...state,
                pay_method_id: action.pay_method_id,
            }
        case types.ADD_COMMENT_TULAI:
            return {
                ...state,
                comment: action.comment,
            }

        case types.DELETE_DATA_TULAI:
            return {
                ...state,
                pick_add: '',
                drop_add: '',
                component_drop: '',
                component_pick: '',
                chunk_id: 0,
                vehicle_name: '',
                full_name: '',
                use_phone: '',
                email: '',
                full_name2: '',
                use_phone2: '',
                email2: '',
                comment: '',
            }
        case types.DURATION_TULAI:
            return {
                ...state,
                duration: action.duration,
            }
        case types.ADD_TRIP_INFOMATION_HOURLY_BOOKING_TULAI:
            return {
                ...state,
                partner_name: action.partner_name,
                merged: action.merged,
                depart_time: action.depart_time,
                extra_price_km_format: action.extra_price_km_format,
                extra_price_hour_format: action.extra_price_hour_format,
                km_limit_format: action.km_limit_format,
                vehicle_icon: action.vehicle_icon,
                vehicle_id: action.vehicle_id,
                vehicle_name: action.vehicle_name,
                city_id: action.city_id,
                brand_partner_id: action.partner_id,
            }
        default:
            return state;
    }

};
export default ReducerTuLai;