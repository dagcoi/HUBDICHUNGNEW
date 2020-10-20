import * as types from './ActionTypes'

export const pickAddress = (pick_add, component_pick, latitude_pick, longitude_pick, typesAddress) => {
    return {
        type: types.PICK_ADDRESS,
        address: pick_add,
        address_component: component_pick,
        latitude_pick: latitude_pick,
        longitude_pick: longitude_pick,
        typesAddress: typesAddress
    }
}

export const dropAddress = (drop_add, component_drop, latitude_drop, longitude_drop, typesAddress) => {
    return {
        type: types.DROP_ADDRESS,
        address: drop_add,
        address_component: component_drop,
        latitude_drop: latitude_drop,
        longitude_drop: longitude_drop,
        typesAddress: typesAddress
    }
}

export const addDepartTime = (depart_time, depart_time2) => {
    return {
        type: types.TIME_PICK,
        depart_time: depart_time,
        depart_time2: depart_time2,
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

export const addAirport = (is_airport) => {
    return {
        type: types.ADD_AIRPORT,
        is_airport: is_airport,
    }
}

export const addTripInformation = (partner_name, merged, depart_time, chunk_id, vehice_id, village_id, pm_id, partner_id, city_id, vehicle_name, toll_fee, dimension_id, vehicle_id, ride_method_id, chair, airport_id, street_id, vehicle_icon, pick_pos, drop_pos, use_range_time, unmerged) => {
    return {
        type: types.TRIP_INFORMATION,
        partner_name: partner_name,
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
    console.log('qqq' + discount_price)
    return {
        type: types.ADD_PROMOTION_CODE,
        promotion_code: promotion_code,
        discount_price: discount_price,
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
        email: email,
    }
}

export const addInfoFlight = (plane_number, plane_type) => {
    return {
        type: types.ADD_INFO_FLIGHT,
        plane_number: plane_number,
        plane_type: plane_type,
    }
}

export const addVAT = (xhd, company_name, company_address, company_mst, company_address_receive) => {
    return {
        type: types.ADD_COMPANY,
        xhd: xhd,
        company_name: company_name,
        company_address: company_address,
        company_mst: company_mst,
        company_address_receive: company_address_receive,
    }
}

export const swapAddress = (pick_address, pick_address_component, latitude_pick, longitude_pick, typesPick, drop_address, drop_address_component, latitude_drop, longitude_drop, typesDrop) => {
    return {
        type: types.SWAP_ADDRESS,
        pick_address: pick_address,
        pick_address_component: pick_address_component,
        latitude_pick: latitude_pick,
        longitude_pick: longitude_pick,
        typesPick: typesPick,
        drop_address: drop_address,
        drop_address_component: drop_address_component,
        latitude_drop: latitude_drop,
        longitude_drop: longitude_drop,
        typesDrop: typesDrop
    }
}

export const addCityTime = (city, rent_date, retun_date, city_name, time_pick, time_drop) => {
    return {
        type: types.ADD_CITY_TIME,
        city: city,
        rent_date: rent_date,
        retun_date: retun_date,
        city_name: city_name,
        time_pick: time_pick,
        time_drop: time_drop,
    }
}

export const addPaymentMethodID = (pay_method_id) => {
    return {
        type: types.ADD_PAY_METHOD_ID,
        pay_method_id: pay_method_id,
    }
}

export const addComment = (comment) => {
    return {
        type: types.ADD_COMMENT,
        comment: comment,
    }
}

export const deleteData = () => {
    return {
        type: types.DELETE_DATA,
    }
}
export const addDuration = (duration) => {
    return {
        type: types.DURATION,
        duration: duration,
    }
}

export const addDurationTravel = (durationTravel) => {
    return {
        type: types.DURATION_TRAVEL,
        durationTravel: durationTravel,
    }
}

export const addTripInformationHourlyBooking = (partner_name, merged, depart_time, extra_price_km_format, extra_price_hour_format, km_limit_format, vehicle_icon, vehicle_id, vehicle_name, city_id, partner_id) => {
    return {
        type: types.ADD_TRIP_INFORMATION_HOURLY_BOOKING,
        partner_name: partner_name,
        merged: merged,
        depart_time: depart_time,
        extra_price_km_format: extra_price_km_format,
        extra_price_hour_format: extra_price_hour_format,
        km_limit_format: km_limit_format,
        vehicle_icon: vehicle_icon,
        vehicle_id: vehicle_id,
        vehicle_name: vehicle_name,
        city_id: city_id,
        partner_id: partner_id,
    }
}

// Tai Xe
export const pickAddressTaixe = (pick_add, component_pick, latitude_pick, longitude_pick) => {
    return {
        type: types.PICK_ADDRESS_TAIXE,
        address: pick_add,
        address_component: component_pick,
        latitude_pick: latitude_pick,
        longitude_pick: longitude_pick,
    }
}

export const dropAddressTaixe = (drop_add, component_drop, latitude_drop, longitude_drop) => {
    return {
        type: types.DROP_ADDRESS_TAIXE,
        address: drop_add,
        address_component: component_drop,
        latitude_drop: latitude_drop,
        longitude_drop: longitude_drop,
    }
}

export const addDepartTimeTaixe = (depart_time, depart_time2) => {
    return {
        type: types.TIME_PICK_TAIXE,
        depart_time: depart_time,
        depart_time2: depart_time2,
    }
}

export const addPeopleTaixe = (chair) => {
    return {
        type: types.ADD_CHAIR_TAIXE,
        chair: chair,
    }
}

export const addTripInformationTaixe = (partner_name, merged, depart_time, chunk_id, vehice_id, village_id, pm_id, partner_id, city_id, vehicle_name, toll_fee, dimension_id, vehicle_id, ride_method_id, chair, airport_id, street_id, vehicle_icon, pick_pos, drop_pos, use_range_time, unmerged) => {
    return {
        type: types.TRIP_INFORMATION_TAIXE,
        partner_name: partner_name,
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

export const addPromotionCodeTaixe = (promotion_code, discount_price) => {
    return {
        type: types.ADD_PROMOTION_CODE_TAIXE,
        promotion_code: promotion_code,
        discount_price: discount_price,
    }
}

export const addInfoPeople1Taixe = (full_name, use_phone, email) => {
    return {
        type: types.ADD_PEOPLE1_TAIXE,
        full_name: full_name,
        use_phone: use_phone,
        email: email,
    }
}

export const addInfoPeople2Taixe = (full_name, use_phone, email) => {
    return {
        type: types.ADD_PEOPLE2_TAIXE,
        full_name: full_name,
        use_phone: use_phone,
        email: email,
    }
}

export const addVATTaixe = (xhd, company_name, company_address, company_mst, company_address_receive) => {
    return {
        type: types.ADD_COMPANY_TAIXE,
        xhd: xhd,
        company_name: company_name,
        company_address: company_address,
        company_mst: company_mst,
        company_address_receive: company_address_receive,
    }
}

export const swapAddressTaixe = (pick_address, pick_address_component, latitude_pick, longitude_pick, drop_address, drop_address_component, latitude_drop, longitude_drop) => {
    return {
        type: types.SWAP_ADDRESS_TAIXE,
        pick_address: pick_address,
        pick_address_component: pick_address_component,
        latitude_pick: latitude_pick,
        longitude_pick: longitude_pick,

        drop_address: drop_address,
        drop_address_component: drop_address_component,
        latitude_drop: latitude_drop,
        longitude_drop: longitude_drop,
    }
}

export const addPaymentMethodIDTaixe = (pay_method_id) => {
    return {
        type: types.ADD_PAY_METHOD_ID_TAIXE,
        pay_method_id: pay_method_id,
    }
}

export const addCommentTaixe = (comment) => {
    return {
        type: types.ADD_COMMENT_TAIXE,
        comment: comment,
    }
}

export const deleteDataTaixe = () => {
    return {
        type: types.DELETE_DATA_TAIXE,
    }
}
export const addDurationTaiXe = (duration) => {
    return {
        type: types.DURATION_TAIXE,
        duration: duration,
    }
}

export const addTripInformationHourlyBookingTaixe = (partner_name, merged, depart_time, extra_price_km_format, extra_price_hour_format, km_limit_format, vehicle_icon, vehicle_id, vehicle_name, city_id, partner_id) => {
    return {
        type: types.ADD_TRIP_INFORMATION_HOURLY_BOOKING_TAIXE,
        partner_name: partner_name,
        merged: merged,
        depart_time: depart_time,
        extra_price_km_format: extra_price_km_format,
        extra_price_hour_format: extra_price_hour_format,
        km_limit_format: km_limit_format,
        vehicle_icon: vehicle_icon,
        vehicle_id: vehicle_id,
        vehicle_name: vehicle_name,
        city_id: city_id,
        partner_id: partner_id,
    }
}

// Van Chuyen
export const pickAddressVanChuyen = (pick_add, component_pick, latitude_pick, longitude_pick) => {
    return {
        type: types.PICK_ADDRESS_VANCHUYEN,
        address: pick_add,
        address_component: component_pick,
        latitude_pick: latitude_pick,
        longitude_pick: longitude_pick,
    }
}

export const dropAddressVanChuyen = (drop_add, component_drop, latitude_drop, longitude_drop) => {
    return {
        type: types.DROP_ADDRESS_VANCHUYEN,
        address: drop_add,
        address_component: component_drop,
        latitude_drop: latitude_drop,
        longitude_drop: longitude_drop,
    }
}

export const addDepartTimeVanChuyen = (depart_time, depart_time2) => {
    return {
        type: types.TIME_PICK_VANCHUYEN,
        depart_time: depart_time,
        depart_time2: depart_time2,
    }
}

export const addPeopleVanChuyen = (chair) => {
    return {
        type: types.ADD_CHAIR_VANCHUYEN,
        chair: chair,
    }
}

export const addTripInformationVanChuyen = (partner_name, merged, depart_time, chunk_id, vehice_id, village_id, pm_id, partner_id, city_id, vehicle_name, toll_fee, dimension_id, vehicle_id, ride_method_id, chair, airport_id, street_id, vehicle_icon, pick_pos, drop_pos, use_range_time, unmerged) => {
    return {
        type: types.TRIP_INFORMATION_VANCHUYEN,
        partner_name: partner_name,
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

export const addPromotionCodeVanChuyen = (promotion_code, discount_price) => {
    return {
        type: types.ADD_PROMOTION_CODE_VANCHUYEN,
        promotion_code: promotion_code,
        discount_price: discount_price,
    }
}

export const addInfoPeople1VanChuyen = (full_name, use_phone, email) => {
    return {
        type: types.ADD_PEOPLE1_VANCHUYEN,
        full_name: full_name,
        use_phone: use_phone,
        email: email,
    }
}

export const addInfoPeople2VanChuyen = (full_name, use_phone, email) => {
    return {
        type: types.ADD_PEOPLE2_VANCHUYEN,
        full_name: full_name,
        use_phone: use_phone,
        email: email,
    }
}

// export const addInfoFlightVanChuyen = (plane_number, plane_type) => {
//     return {
//         type: types.ADD_INFO_FLIGHT,
//         plane_number: plane_number,
//         plane_type: plane_type,
//     }
// }

export const addVATVanChuyen = (xhd, company_name, company_address, company_mst, company_address_receive) => {
    return {
        type: types.ADD_COMPANY_VANCHUYEN,
        xhd: xhd,
        company_name: company_name,
        company_address: company_address,
        company_mst: company_mst,
        company_address_receive: company_address_receive,
    }
}

export const swapAddressVanChuyen = (pick_address, pick_address_component, latitude_pick, longitude_pick, drop_address, drop_address_component, latitude_drop, longitude_drop) => {
    return {
        type: types.SWAP_ADDRESS_VANCHUYEN,
        pick_address: pick_address,
        pick_address_component: pick_address_component,
        latitude_pick: latitude_pick,
        longitude_pick: longitude_pick,

        drop_address: drop_address,
        drop_address_component: drop_address_component,
        latitude_drop: latitude_drop,
        longitude_drop: longitude_drop,
    }
}

export const addPaymentMethodIDVanChuyen = (pay_method_id) => {
    return {
        type: types.ADD_PAY_METHOD_ID_VANCHUYEN,
        pay_method_id: pay_method_id,
    }
}

export const addCommentVanChuyen = (comment) => {
    return {
        type: types.ADD_COMMENT_VANCHUYEN,
        comment: comment,
    }
}

export const deleteDataVanChuyen = () => {
    return {
        type: types.DELETE_DATA_VANCHUYEN,
    }
}
export const addDurationVanChuyen = (duration) => {
    return {
        type: types.DURATION_VANCHUYEN,
        duration: duration,
    }
}

export const addTripInformationHourlyBookingVanChuyen = (partner_name, merged, depart_time, extra_price_km_format, extra_price_hour_format, km_limit_format, vehicle_icon, vehicle_id, vehicle_name, city_id, partner_id) => {
    return {
        type: types.ADD_TRIP_INFORMATION_HOURLY_BOOKING_VANCHUYEN,
        partner_name: partner_name,
        merged: merged,
        depart_time: depart_time,
        extra_price_km_format: extra_price_km_format,
        extra_price_hour_format: extra_price_hour_format,
        km_limit_format: km_limit_format,
        vehicle_icon: vehicle_icon,
        vehicle_id: vehicle_id,
        vehicle_name: vehicle_name,
        city_id: city_id,
        partner_id: partner_id,
    }
}

export const addAddressYCDB = (pick_add, component_pick, latitude_pick, longitude_pick) => {
    return {
        type: types.PICK_ADDRESS_YCDB,
        address: pick_add,
        address_component: component_pick,
        latitude_pick: latitude_pick,
        longitude_pick: longitude_pick,
    }
}

//Tự lái Đi Chung
export const pickAddressTuLai = (pick_add, component_pick, latitude_pick, longitude_pick) => {
    return {
        type: types.PICK_ADDRESS_TULAI,
        address: pick_add,
        address_component: component_pick,
        latitude_pick: latitude_pick,
        longitude_pick: longitude_pick,
    }
}

export const dropAddressTuLai = (drop_add, component_drop, latitude_drop, longitude_drop) => {
    return {
        type: types.DROP_ADDRESS_TULAI,
        address: drop_add,
        address_component: component_drop,
        latitude_drop: latitude_drop,
        longitude_drop: longitude_drop,
    }
}

export const addDepartTimeTuLai = (depart_time, depart_time2) => {
    return {
        type: types.TIME_PICK_TULAI,
        depart_time: depart_time,
        depart_time2: depart_time2,
    }
}

export const addPeopleTuLai = (chair) => {
    return {
        type: types.ADD_CHAIR_TULAI,
        chair: chair,
    }
}

export const addTripInformationTuLai = (partner_name, merged, depart_time, chunk_id, vehice_id, village_id, pm_id, partner_id, city_id, vehicle_name, toll_fee, dimension_id, vehicle_id, ride_method_id, chair, airport_id, street_id, vehicle_icon, pick_pos, drop_pos, use_range_time, unmerged) => {
    return {
        type: types.TRIP_INFORMATION_TULAI,
        partner_name: partner_name,
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

export const addPromotionCodeTuLai = (promotion_code, discount_price) => {
    return {
        type: types.ADD_PROMOTION_CODE_TULAI,
        promotion_code: promotion_code,
        discount_price: discount_price,
    }
}

export const addInfoPeople1TuLai = (full_name, use_phone, email) => {
    return {
        type: types.ADD_PEOPLE1_TULAI,
        full_name: full_name,
        use_phone: use_phone,
        email: email,
    }
}

export const addInfoPeople2TuLai = (full_name, use_phone, email) => {
    return {
        type: types.ADD_PEOPLE2_TULAI,
        full_name: full_name,
        use_phone: use_phone,
        email: email,
    }
}

export const addVATTuLai = (xhd, company_name, company_address, company_mst, company_address_receive) => {
    return {
        type: types.ADD_COMPANY_TULAI,
        xhd: xhd,
        company_name: company_name,
        company_address: company_address,
        company_mst: company_mst,
        company_address_receive: company_address_receive,
    }
}

export const swapAddressTuLai = (pick_address, pick_address_component, latitude_pick, longitude_pick, drop_address, drop_address_component, latitude_drop, longitude_drop) => {
    return {
        type: types.SWAP_ADDRESS_TULAI,
        pick_address: pick_address,
        pick_address_component: pick_address_component,
        latitude_pick: latitude_pick,
        longitude_pick: longitude_pick,

        drop_address: drop_address,
        drop_address_component: drop_address_component,
        latitude_drop: latitude_drop,
        longitude_drop: longitude_drop,
    }
}

export const addPaymentMethodIDTuLai = (pay_method_id) => {
    return {
        type: types.ADD_PAY_METHOD_ID_TULAI,
        pay_method_id: pay_method_id,
    }
}

export const addCommentTuLai = (comment) => {
    return {
        type: types.ADD_COMMENT_TULAI,
        comment: comment,
    }
}

export const deleteDataTuLai = () => {
    return {
        type: types.DELETE_DATA_TULAI,
    }
}
export const addDurationTuLai = (duration) => {
    return {
        type: types.DURATION_TULAI,
        duration: duration,
    }
}

export const addTripInformationHourlyBookingTuLai = (partner_name, merged, depart_time, extra_price_km_format, extra_price_hour_format, km_limit_format, vehicle_icon, vehicle_id, vehicle_name, city_id, partner_id) => {
    return {
        type: types.ADD_TRIP_INFORMATION_HOURLY_BOOKING_TULAI,
        partner_name: partner_name,
        merged: merged,
        depart_time: depart_time,
        extra_price_km_format: extra_price_km_format,
        extra_price_hour_format: extra_price_hour_format,
        km_limit_format: km_limit_format,
        vehicle_icon: vehicle_icon,
        vehicle_id: vehicle_id,
        vehicle_name: vehicle_name,
        city_id: city_id,
        partner_id: partner_id,
    }
}

export const addUser = (name, link_avatar, isLogin) => {
    return {
        type: types.ADD_INFO_USER,
        name: name,
        link_avatar: link_avatar,
        isLogin: isLogin,
    }
}

export const addToken = (token) => {
    return {
        type: types.ADD_TOKEN,
        token: token,
    }
}

export const addModal = (ishow) => {
    return {
        type: types.ADD_MODAL,
        ishow: ishow,
    }
}

export const addProductChunkType = (product_chunk_type) => {
    return {
        type: types.PRODUCT_CHUNK_TYPE,
        product_chunk_type: product_chunk_type
    }
}

export const addSend = (send, label) => {
    return {
        type: types.ADD_SEND,
        send: send,
        label: label,
    }
}


export const addCost = (cost, vehicle_icon) => {
    return {
        type: types.ADD_COST,
        cost: cost,
        vehicle_icon: vehicle_icon,
    }
}

export const addExtra = (extra) => {
    return {
        type: types.ADD_EXTRA,
        extra: extra,
    }
}


export const addLocation = (addressLocation, addressLocationComponent, latLocation, lngLocation) => {
    return {
        type: types.ADD_LOCATION,
        addressLocation: addressLocation,
        addressLocationComponent: addressLocationComponent,
        latLocation: latLocation,
        lngLocation: lngLocation
    }
}


export const addSendCaro = (sendCaro, label) => {
    return {
        type: types.ADD_SEND_CARO,
        sendCaro: sendCaro,
        label: label,
    }
}


export const addCaroDuration = (durationCaro, distanceCaro) => {
    return {
        type: types.ADD_CARO_DURATION,
        durationCaro: durationCaro,
        distanceCaro: distanceCaro,
    }
}

export const addCarType = (carName, carType) => {
    return {
        type: types.ADD_CAR_TYPE,
        carName: carName,
        carType: carType,
    }
}

export const addReturnTime = (returnTime, returnTime2) => {
    return {
        type: types.ADD_RETURN_TIME,
        returnTime: returnTime,
        returnTime2: returnTime2,
    }
}

export const addVehicleType = (vehicleType, vehicleName) => {
    return {
        type: types.ADD_VEHICLE_TYPE,
        vehicleType: vehicleType,
        vehicleName: vehicleName,
    }
}

export const setModalCarType = (modalCarType) => {
    return {
        type: types.SET_MODAL_CAR_TYPE,
        modalCarType: modalCarType,
    }
}


export const setModalVehicleType = (modalVehicleType) => {
    return {
        type: types.SET_MODAL_VEHICLE_TYPE,
        modalVehicleType: modalVehicleType,
    }
}

export const setProvider = (provider) => {
    return {
        type: types.SET_PROVIDER,
        provider: provider,
    }
}

export const setTimePick = (timePick) => {
    return {
        type: types.SET_TIME_PICK,
        timePick: timePick,
    }
}

export const setTimeDrop = (timeDrop) => {
    return {
        type: types.SET_TIME_DROP,
        timeDrop: timeDrop,
    }
}

export const setModalTime = (modalPick, modalDrop) => {
    console.log(modalPick, modalDrop)
    return {
        type: types.SET_MODAL_TIME,
        modalPick: modalPick,
        modalDrop: modalDrop,
    }
}

export const addIdCustomer = (idCustomer) => {
    return {
        type: types.ADD_ID_CUSTOMER,
        idCustomer: idCustomer,
    }
}

export const addItemCarOperator = (itemCarOperator) => {
    return {
        type: types.ADD_ITEM_CAR_TYPE,
        itemCarOperator: itemCarOperator,
        modalCarTypeOperator: false,
    }
}

export const showModalOperator = (modalCarTypeOperator) => {
    return {
        type: types.SHOW_MODAL_CAR_OPERATOR,
        modalCarTypeOperator: modalCarTypeOperator
    }
}

export const addItemCarOperator1 = (itemCarOperator1) => {
    return {
        type: types.ADD_ITEM_CAR_TYPE1,
        itemCarOperator1: itemCarOperator1,
        modalCarTypeOperator1: false,
    }
}

export const showModalOperator1 = (modalCarTypeOperator) => {
    return {
        type: types.SHOW_MODAL_CAR_OPERATOR1,
        modalCarTypeOperator1: modalCarTypeOperator
    }
}

export const addItemTypePrice = (itemTypePrice) => {
    return {
        type: types.ADD_ITEM_TYPE_PRICE,
        itemTypePrice: itemTypePrice,
        modalTypePrice: false,
    }
}

export const showModalTypePrice = (modalTypeOperator) => {
    return {
        type: types.MODAL_TYPE_PRICE,
        modalTypePrice: modalTypeOperator
    }
}

export const addTimePick = (idTimePick, timePick) => {
    return {
        type: types.ADD_TIME_PICK,
        idTimePick: idTimePick,
        timePick: timePick,
        modalTimePick: false,
    }
}

export const addTimeDrop = (idTimeDrop, timeDrop) => {
    return {
        type: types.ADD_TIME_DROP,
        idTimeDrop: idTimeDrop,
        timeDrop: timeDrop,
        modalTimeDrop: false,
    }
}

export const showModalTimePick = (modalTimePick) => {
    return {
        type: types.SHOW_MODAL_TIME_PICK,
        modalTimePick: modalTimePick
    }
}

export const showModalTimeDrop = (modalTimeDrop) => {
    return {
        type: types.SHOW_MODAL_TIME_DROP,
        modalTimeDrop: modalTimeDrop
    }
}

export const showModalConfirm = (modalConfirm) => {
    return {
        type: types.SHOW_MODAL_CONFIRM,
        modalConfirm: modalConfirm
    }
}

export const addItemConfirm = (itemConfirm) => {
    return {
        type: types.ADD_ITEM_CONFIRM,
        itemConfirm: itemConfirm,
        modalConfirm: false,
    }
}

export const addListDayOfWeek = (listDaySelect) => {
    return {
        type: types.LIST_DAY_OF_WEEK,
        listDaySelect: listDaySelect,
    }
}

export const addSendDataOperator = (sendDataOperator) => {
    return {
        type: types.ADD_DATA_SEND_OPERATOR,
        sendDataOperator: sendDataOperator,
    }
}

export const showModalCity = (modalCity) => {
    return {
        type: types.SHOW_MODAL_CITY,
        modalCity: modalCity
    }
}

export const addItemCity = (itemCity) => {
    return {
        type: types.ADD_ITEM_CITY,
        itemCity: itemCity,
        modalCity: false,
    }
}


export const showModalTransmission = (modalTransmission) => {
    return {
        type: types.SHOW_MODAL_TRANSMISSION,
        modalTransmission: modalTransmission
    }
}

export const addItemTransmission = (itemTransmission) => {
    return {
        type: types.ADD_ITEM_TRANSMISSION,
        itemTransmission: itemTransmission,
        modalTransmission: false,
    }
}

export const showModalVehicle = (modalVehicle) => {
    return {
        type: types.SHOW_MODAL_VEHICLE,
        modalVehicle: modalVehicle
    }
}

export const addItemVehicle = (itemVehicle) => {
    return {
        type: types.ADD_ITEM_VEHICLE,
        itemVehicle: itemVehicle,
        itemSlot: { 'value': 0, 'label': '1' },
        modalVehicle: false,
    }
}

export const showModalSlot = (modalSlot) => {
    return {
        type: types.SHOW_MODAL_SLOT,
        modalSlot: modalSlot
    }
}

export const addItemSlot = (itemSlot) => {
    return {
        type: types.ADD_ITEM_SLOT,
        itemSlot: itemSlot,
        modalSlot: false,
    }
}

export const addBookDeliveryForm = (bookDeliveryFrom) => {
    return {
        type: types.ADD_BOOKING_DELIVERY_FORM,
        bookDeliveryFrom: bookDeliveryFrom,
    }
}


