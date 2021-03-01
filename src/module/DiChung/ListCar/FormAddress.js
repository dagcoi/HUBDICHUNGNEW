import React from 'react'
import { View, Text } from 'react-native'
import FormTaxi from '../MapDiChung/FormTaxi';
import FormHourlyTaxi from '../MapDiChung/FormHourlyTaxi';
import FormChungxeTuyen from '../../ChungXe/MapChungXe/FormChungxeTuyen';
import FormChungxe from '../../ChungXe/MapChungXe/FormChungxe';
import FormExpress from '../../Express/MapExpress/FormExpress';
import FormHourlyTruck from '../../ScreenAddress/Truck/FormHourlyTruck';
import FormTruckDoor from '../../ScreenAddress/Truck/FormTruckDoor';
import FormHourlyXeChung from '../../XeChung/MapXeChung/FormHourlyXeChung';
import FormXeChung from '../../XeChung/MapXeChung/FormXeChung';
import FormHourlyTravel from '../../ScreenAddress/Travel/FormHourlyTravel';
import FormTravel from '../../ScreenAddress/Travel/FormTravel';
import FormRideShare from '../../ScreenAddress/RideShare/FormRideShare';

export default function FormAddress({ product_chunk_type, pressPickAddress, pressDropAddress, pressSwap, pressSelectTime, pressSelectSlot, pressVehicleType, onPressSelectTimeReturn }) {
    switch (product_chunk_type) {
        case 'transfer_service':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormTaxi
                        onPressPickAddress={pressPickAddress}
                        onPressDropAddress={pressDropAddress}
                        onPressSwap={pressSwap}
                        onPressSelectTime={pressSelectTime}
                        onPressSelectSlot={pressSelectSlot}
                    />
                </View>
            )
        case 'hourly_rent_taxi':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormHourlyTaxi
                        onPressPickAddress={pressPickAddress}
                        onPressSelectTime={pressSelectTime}
                        onPressCarType={pressCarType}
                        onPressHourglass={pressHourglass}
                    />
                </View>
            )
        case 'car_rental':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormChungxeTuyen
                        onPressPickAddress={pressPickAddress}
                        onPressDropAddress={pressDropAddress}
                        onPressSwap={pressSwap}
                        onPressSelectTime={pressSelectTime}
                        onPressSelectSlot={pressSelectSlot}
                    />
                </View>
            )
        case 'hourly_car_rental':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormChungxe
                        onPressPickAddress={pressPickAddress}
                        onPressSelectTimeRent={pressSelectTime}
                        onPressVehicle={pressVehicleType}
                        onPressSelectTimeReturn={onPressSelectTimeReturn}
                    />
                </View>
            )
        case 'express':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormExpress
                        onPressPickAddress={pressPickAddress}
                        onPressDropAddress={pressDropAddress}
                        onPressSwap={pressSwap}
                        onPressSelectTime={pressSelectTime}
                        onPressSelectSlot={pressSelectSlot}
                    />
                </View>
            )
        case 'driver_rental':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormXeChung
                        onPressPickAddress={pressPickAddress}
                        onPressDropAddress={pressDropAddress}
                        onPressSwap={pressSwap}
                        onPressSelectTime={pressSelectTime}
                    />
                </View>
            )
        case 'hourly_rent_driver':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormHourlyXeChung
                        onPressPickAddress={pressPickAddress}
                        onPressSelectTime={pressSelectTime}
                        onPressSelectSlot={pressSelectSlot}
                    />
                </View>
            )
        case 'hourly_freight_truck':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormHourlyTruck
                        onPressPickAddress={pressPickAddress}
                        onPressDropAddress={pressDropAddress}
                        onPressSwap={pressSwap}
                        onPressSelectTime={pressSelectTime}
                        onPressSelectSlot={pressSelectSlot}
                    />
                </View>
            )
        case 'truck':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormTruckDoor
                        onPressPickAddress={pressPickAddress}
                        onPressDropAddress={pressDropAddress}
                        onPressSwap={pressSwap}
                        onPressSelectTime={pressSelectTime}
                        onPressSelectSlot={pressSelectSlot}
                    />
                </View>
            )
        case 'hourly_tourist_car':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormHourlyTravel
                        onPressPickAddress={pressPickAddress}
                        onPressDropAddress={pressDropAddress}
                        onPressSwap={pressSwap}
                        onPressSelectTime={pressSelectTime}
                        onPressSelectSlot={pressSelectSlot}
                    />
                </View>
            )
        case 'tourist_car':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormTravel
                        onPressPickAddress={pressPickAddress}
                        onPressDropAddress={pressDropAddress}
                        onPressSwap={pressSwap}
                        onPressSelectTime={pressSelectTime}
                        onPressSelectSlot={pressSelectSlot}
                    />
                </View>
            )
        case 'ride_share':
            return (
                <View style={{ margin: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8' }}>
                    <FormRideShare
                        onPressPickAddress={pressPickAddress}
                        onPressDropAddress={pressDropAddress}
                        onPressSwap={pressSwap}
                        onPressSelectTime={pressSelectTime}
                        onPressSelectSlot={pressSelectSlot}
                    />
                </View>
            )
        default: null
    }
}


