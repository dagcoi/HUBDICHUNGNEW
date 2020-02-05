import * as types from './ActionTypes'

export const pickAddress = (pick_add, component_pick, lattitude_pick, lngtitude_pick) => {
    return {
        type: types.PICK_ADDRESS,
        address: pick_add,
        address_component: component_pick,
        lattitude_pick: lattitude_pick,
        lngtitude_pick: lngtitude_pick,
    }
}

export const dropAddress = (drop_add, component_drop, lattitude_drop, lngtitude_drop) => {
    return {
        type: types.DROP_ADDRESS,
        address: drop_add,
        address_component: component_drop,
        lattitude_drop: lattitude_drop,
        lngtitude_drop: lngtitude_drop,
    }
}

export const addDepartTime = (depart_time) => {
    return {
        type: types.TIME_PICK,
        depart_time: depart_time,
    }
}

export const addPeople = (chair) => {
    return {
        type: types.ADD_CHAIR,
        chair: chair,
    }
}

export const addIsFromAirport = (is_from_airport) => {
    return {
        type: types.ADD_IS_FROM_AIRPORT,
        is_from_airport: is_from_airport,
    }
}

export const addTripInfomation = (merged, depart_time, chunk_id, vehice_id, village_id, pm_id, partner_id, city_id, vehicle_name, toll_fee, dimension_id, vehicle_id, ride_method_id, chair, airport_id, street_id, vehicle_icon, pick_pos, drop_pos, use_range_time, unmerged) => {
    return {
        type: types.TRIP_INFOMATION,
        merged: merged,
        depart_time: depart_time,
        chunk_id: chunk_id,
        village_id: village_id,
        toll_fee: toll_fee,
        pm_id: pm_id,
        vehice_id: vehice_id,
        brand_partner_id: partner_id,
        city_id: city_id,
        vehicle_name: vehicle_name,
        dimension_id: dimension_id,
        vehicle_id: vehicle_id,
        ride_method_id: ride_method_id,
        chair: chair,
        airport_id: airport_id,
        street_id: street_id,
        vehicle_icon: vehicle_icon,
        pick_pos: pick_pos,
        drop_pos: drop_pos,
        use_range_time: use_range_time,
        unmerged: unmerged,
    }
}

export const addPromotionCode = (promotion_code, discount_price) => {
    return {
        type: types.ADD_PROMOTION_CODE,
        promotion_code: promotion_code,
        discount_price : discount_price,
    }
}

export const addInfoPeople1 = (full_name, use_phone, email) => {
    return {
        type: types.ADD_PEOPLE1,
        full_name: full_name,
        use_phone: use_phone,
        email: email,
    }
}

export const addInfoPeople2 = (full_name, use_phone, email) => {
    return {
        type: types.ADD_PEOPLE2,
        full_name: full_name,
        use_phone: use_phone,
        email : email,
    }
}

export const addInfoFlight = (plane_number, plane_type) => {
    return {
        type: types.ADD_INFO_FLIGHT,
        plane_number: plane_number,
        plane_type: plane_type,
    }
}

export const addVAT = (xhd,company_name, company_address, company_mst, company_address_receive) => {
    return {
        type: types.ADD_COMPANY,
        xhd : xhd,
        company_name: company_name,
        company_address: company_address,
        company_mst: company_mst,
        company_address_receive: company_address_receive,
    }
}

export const swapAddress = (pick_address,pick_address_component,lattitude_pick,lngtitude_pick,drop_address,drop_address_component,lattitude_drop,lngtitude_drop) =>{
    return {
        type: types.SWAP_ADDRESS,
        pick_address: pick_address,
        pick_address_component: pick_address_component,
        lattitude_pick: lattitude_pick,
        lngtitude_pick: lngtitude_pick,

        drop_address: drop_address,
        drop_address_component: drop_address_component,
        lattitude_drop: lattitude_drop,
        lngtitude_drop: lngtitude_drop,
    }
}

export const addCityTime = (city,rent_date,retun_date,city_name, time_pick, time_drop) => {
    return {
        type : types.ADD_CITY_TIME,
        city : city,
        rent_date : rent_date,
        retun_date : retun_date,
        city_name : city_name,
        time_pick : time_pick,
        time_drop : time_drop,
    }
}

export const addFullName = (full_name) => {
    return {
        type
    }
}


