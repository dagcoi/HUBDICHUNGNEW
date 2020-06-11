import * as React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
// import * as ModalAction from './module/RootModal/ModalAction';

import Home from './module/Home'
import Splash from './module/Splash'
// import Map from './module/Map'
import MapDiChung from './module/DiChung/MapDiChung'
import InfoCustommer from './module/DiChung/InfoCustommer'
import SearchPlace from './module/DiChung/SearchPlace'
import ConfirmInformation from './module/DiChung/ConfirmInformation'
import ListCar from './module/DiChung/ListCar'
import TicketInformation from './module/DiChung/TicketInformation'
import PaymentOnline from './module/DiChung/PaymentOnline'
import ListCarHourlyBooking from './module/DiChung/ListCarHourlyBooking'
import InfoCustommerHourlyBooking from './module/DiChung/InfoCustommerHourlyBooking'
import ConfirmInformationHB from './module/DiChung/ConfirmInformationHB'


import MapChungXe from './module/ChungXe/MapChungXe'
import ListVehicle from './module/ChungXe/ListVehicle'
import InfoChungXe from './module/ChungXe/InfoCarChungXe'
import ConfirmInfoChungXe from './module/ChungXe/ConfirmInfoChungXe'
import ChungXeTicketInformation from './module/ChungXe/ChungXeTicketInformation'


import MapXeChung from './module/XeChung/MapXeChung'
import ListDriverXeChung from './module/XeChung/ListDriverXeChung'
import InfoCustommerXeChung from './module/XeChung/InfoCustommerXeChung'
import ConfirmInformationXeChung from './module/XeChung/ConfirmInformationXeChung'
import TicketInformationXeChung from './module/XeChung/TicketInformationXeChung'
import ListDriverHourlyBooking from './module/XeChung/ListDriverHourlyBooking'
import InfoCustommerHourlyRentDriver from './module/XeChung/InfoCustommerHourlyRentDriver'
import ConfirmInformationRentDriver from './module/XeChung/ConfirmInformationRentDriver'
import SearchPlaceXeChung from './module/XeChung/SearchPlaceXeChung'

import MapExpress from './module/Express/MapExpress'
import ListDriverExpress from './module/Express/ListDriverExpress'
import InfoCustommerExpress from './module/Express/InfoCustommerExpress'
import ConfirmInformationExpress from './module/Express/ConfirmInformationExpress'
import TicketInformationExpress from './module/Express/TicketInformationExpress'
import ListFreightTruck from './module/Express/ListFreightTruck'
import InfoCustommerHourlyFreightTruck from './module/Express/InfoCustommerHourlyFreightTruck'
import ConfirmInformationFreightTruck from './module/Express/ConfirmInformationFreightTruck'
import SearchPlaceExpress from './module/Express/SearchPlaceExpress'

import MapDiChungTuLai from './module/DiChungTuLai/MapDiChungTuLai'
import SerchPlaceTuLai from './module/DiChungTuLai/SerchPlaceTuLai'
import ListCarTuLai from './module/DiChungTuLai/ListCarTuLai'
import InfoCustommerTuLai from './module/DiChungTuLai/InfoCustommerTuLai'
import ConfirmInformationTuLai from './module/DiChungTuLai/ConfirmInformationTuLai'
import TicketInformationTuLai from './module/DiChungTuLai/TicketInformationTuLai'
import ListCarHourlyBookingTL from './module/DiChungTuLai/ListCarHourlyBookingTL'
import InfoCustommerHourlyBookingTL from './module/DiChungTuLai/InfoCustommerHourlyBookingTL'
import ConfirmInformationHourlyBookingTL from './module/DiChungTuLai/ConfirmInformationHourlyBookingTL'
import Procedure from './module/DiChungTuLai/Procedure'

import SpecialRequirements from './module/SpecialRequirements/SpecialRequirements'

import AboutUs from './module/WebView/AboutUs'
import News from './module/WebView/News'
import FAQ from './module/WebView/FAQ'
import PoliciesAndServices from './module/WebView/PoliciesAndServices'

import SearchTicket from './module/SearchTicket'
import Login from './module/Account/Login'
import Profile from './module/Account/Profile'
import ListBooking from './module/ListBooking'
import DetailTicket from './module/ListBooking/DetailTicket.js'
import Registration from './module/Account/Registration'

import { createDrawerNavigator } from 'react-navigation-drawer'
import CustomNavigator from './component/CustomNavigator'
import { connect } from 'react-redux'

// import OTP from './module/OTP'
// import { createDrawerNavigator } from 'react-navigation-drawer'

const ListBookingDetail = createStackNavigator({
    ListBooking: {
        screen: ListBooking,
        navigationOptions: {
            header: null,
        }
    },
    DetailTicket: {
        screen: DetailTicket,
        navigationOptions: {
            title: 'Chi tiết mã vé'
        }
    }
})

const RootStack = createStackNavigator({



    // OTP : {
    //     screen : OTP,
    //     navigationOptions : {
    //         header : null,
    //     }
    // },


    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        },
    },

    MapDiChung: {
        screen: MapDiChung,
        navigationOptions: {
            title: 'Thuê xe taxi',
        },
        path: '/thue-xe-taxi'
    },

    ConfirmInformation: {
        screen: ConfirmInformation,
        navigationOptions: {
            title: 'Xác nhận thông tin',
        }
    },

    InfoCustommer: {
        screen: InfoCustommer,
        navigationOptions: {
            title: 'Thông tin đặt xe',
        }
    },

    ListCar: {
        screen: ListCar,
        navigationOptions: {
            title: 'Chọn xe',
        }
    },

    ListCarHourlyBooking: {
        screen: ListCarHourlyBooking,
        navigationOptions: {
            title: 'Chọn xe',
        }
    },

    InfoCustommerHourlyBooking: {
        screen: InfoCustommerHourlyBooking,
        navigationOptions: {
            title: 'Thông tin đặt xe',
        }
    },

    ConfirmInformationHB: {
        screen: ConfirmInformationHB,
        navigationOptions: {
            title: 'Xác nhận thông tin',
        }
    },

    SearchPlace: {
        screen: SearchPlace,
        navigationOptions: {
            title: 'Nhập địa chỉ',
        }
    },

    PaymentOnline: {
        screen: PaymentOnline,
        navigationOptions: {
            header: null,
        }
    },

    MapChungXe: {
        screen: MapChungXe,
        navigationOptions: {
            title: 'Thuê xe tự lái',
        },
        path: 'https://dichung.vn/thue-xe-tu-lai'
    },

    ListVehicle: {
        screen: ListVehicle,
        navigationOptions: {
            title: 'Danh sách xe',
        },
    },

    InfoChungXe: {
        screen: InfoChungXe,
        navigationOptions: {
            title: 'Thông tin',
        }
    },

    ConfirmInfoChungXe: {
        screen: ConfirmInfoChungXe,
        navigationOptions: {
            title: 'Xác nhận thông tin',
        }
    },

    TicketInformation: {
        screen: TicketInformation,
        navigationOptions: {
            header: null,
        }
    },

    ChungXeTicketInformation: {
        screen: ChungXeTicketInformation,
        navigationOptions: {
            header: null,
        }
    },

    MapXeChung: {
        screen: MapXeChung,
        navigationOptions: {
            title: 'Thuê tài xế',
        },
        path: 'https://dichung.vn/thue-lai-xe'
    },

    ListDriverXeChung: {
        screen: ListDriverXeChung,
        navigationOptions: {
            title: 'Danh sách lái xe',
        }
    },

    InfoCustommerXeChung: {
        screen: InfoCustommerXeChung,
        navigationOptions: {
            title: 'Thông tin khách hàng',
        }
    },

    ConfirmInformationXeChung: {
        screen: ConfirmInformationXeChung,
        navigationOptions: {
            title: 'Xác nhận thông tin'
        }
    },
    TicketInformationXeChung: {
        screen: TicketInformationXeChung,
        navigationOptions: {
            header: null,
        }
    },

    ListDriverHourlyBooking: {
        screen: ListDriverHourlyBooking,
        navigationOptions: {
            title: 'Danh sách lái xe'
        }
    },

    InfoCustommerHourlyRentDriver: {
        screen: InfoCustommerHourlyRentDriver,
        navigationOptions: {
            title: 'Thông tin khách hàng'
        }
    },

    ConfirmInformationRentDriver: {
        screen: ConfirmInformationRentDriver,
        navigationOptions: {
            title: 'Xác nhận thông tin'
        }
    },

    MapExpress: {
        screen: MapExpress,
        navigationOptions: {
            title: 'Vận chuyển hàng hóa',
        },
        path: 'https://dichung.vn/thue-van-chuyen'
    },

    ListDriverExpress: {
        screen: ListDriverExpress,
        navigationOptions: {
            title: 'Danh sách dịch vụ',
        }
    },

    InfoCustommerExpress: {
        screen: InfoCustommerExpress,
        navigationOptions: {
            title: 'Thông tin khách hàng',
        }
    },

    ConfirmInformationExpress: {
        screen: ConfirmInformationExpress,
        navigationOptions: {
            title: 'Xác nhận thông tin'
        }
    },
    TicketInformationExpress: {
        screen: TicketInformationExpress,
        navigationOptions: {
            header: null,
        }
    },

    ListFreightTruck: {
        screen: ListFreightTruck,
        navigationOptions: {
            title: 'Danh sách dịch vụ',
        }
    },

    InfoCustommerHourlyFreightTruck: {
        screen: InfoCustommerHourlyFreightTruck,
        navigationOptions: {
            title: 'Thông tin khách hàng',
        }
    },

    ConfirmInformationFreightTruck: {
        screen: ConfirmInformationFreightTruck,
        navigationOptions: {
            title: 'Xác nhận thông tin'
        }
    },

    SearchPlaceXeChung: {
        screen: SearchPlaceXeChung,
        navigationOptions: {
            title: 'Nhập địa chỉ'
        }
    },

    SearchPlaceExpress: {
        screen: SearchPlaceExpress,
        navigationOptions: {
            title: 'Nhập địa chỉ'
        }
    },

    SpecialRequirements: {
        screen: SpecialRequirements,
        navigationOptions: {
            title: 'Yêu cầu đặc biệt',
        },
    },

    MapDiChungTuLai: {
        screen: MapDiChungTuLai,
        navigationOptions: {
            title: 'Tự lái Đi Chung'
        },
        path: 'https://dichung.vn/tu-lai-di-chung'
    },

    SerchPlaceTuLai: {
        screen: SerchPlaceTuLai,
        navigationOptions: {
            title: 'Nhập địa chỉ',
        }
    },

    ListCarTuLai: {
        screen: ListCarTuLai,
        navigationOptions: {
            title: 'Tự lái Đi Chung',
        }
    },

    InfoCustommerTuLai: {
        screen: InfoCustommerTuLai,
        navigationOptions: {
            title: 'Nhập thông tin'
        }
    },

    ConfirmInformationTuLai: {
        screen: ConfirmInformationTuLai,
        navigationOptions: {
            title: 'Xác nhận đặt xe'
        }
    },

    TicketInformationTuLai: {
        screen: TicketInformationTuLai,
        navigationOptions: {
            header: null,
        }
    },

    ListCarHourlyBookingTL: {
        screen: ListCarHourlyBookingTL,
        navigationOptions: {
            title: 'Danh sách xe',
        }
    },

    Procedure: {
        screen: Procedure,
        navigationOptions: {
            title: 'Thủ tục thuê xe'
        }
    },

    InfoCustommerHourlyBookingTL: {
        screen: InfoCustommerHourlyBookingTL,
        navigationOptions: {
            title: 'Nhập thông tin'
        }
    },

    ConfirmInformationHourlyBookingTL: {
        screen: ConfirmInformationHourlyBookingTL,
        navigationOptions: {
            title: 'Xác nhận đặt xe'
        }
    },

    // Registration : {
    //     screen : Registration,
    //     navigationOptions : {
    //         title : 'Đăng kí',
    //     }
    // },

})

const Profiles = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },

    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null,
        }
    },
})

const DrawerNavi = createDrawerNavigator({
    Main: {
        screen: RootStack,
        navigationOptions: {
            title: 'Đặt xe',
            alignItems: 'center'
        }
    },

    // SearchTicket: {
    //     screen: SearchTicket,
    //     navigationOptions: {
    //         title: 'Tra cứu mã vé',
    //         alignItems: 'center'
    //     }
    // },

    AboutUs: {
        screen: AboutUs,
        navigationOptions: {
            title: 'Về chúng tôi',
            alignItems: 'center'
        },
    },
    News: {
        screen: News,
        navigationOptions: {
            title: 'Tin tức',
            alignItems: 'center'
        },
    },
    FAQ: {
        screen: FAQ,
        navigationOptions: {
            title: 'Câu hỏi thường gặp',
            alignItems: 'center'
        },
    },
    PoliciesAndServices: {
        screen: PoliciesAndServices,
        navigationOptions: {
            title: 'Chính sách vận chuyển',
            alignItems: 'center'
        },
    },
    ListBooking: {
        screen: ListBookingDetail,
        // navigationOptions: {
        //     title: 'Danh sách vé',
        //     alignItems: 'center'
        // }
        navigationOptions: ({ navigation }) => {
            // if (this.props.isLogin == '0') {
            //     return {
            //         drawerLabel: () => null,
            //     }
            // } else {
            return {
                drawerLabel: () => 'Danh sách vé',
            }
            // }
        }
    },

    Profiles: {
        screen: Profiles,
        navigationOptions: ({ navigation }) => {
            return {
                drawerLabel: () => null,
            }
        }
    },

}, {
    initialRouteName: 'Main',
    drawerPosition: 'left',
    drawerWidth: 300,
    contentOptions: {
        activeTintColor: '#77a300',
        activeBackgroundColor: '#e8e8e8',
    },
    contentComponent: CustomNavigator,
})

const MainStack = createStackNavigator({

    Home: {
        screen: DrawerNavi,
        navigationOptions: {
            header: null,
        }
    },

    Profiles: {
        screen: Profiles,
        navigationOptions: {
            title: 'Thông tin',
            alignItems: 'center'
        }
    },
})

function mapStateToProps(state) {
    return {
        link_avatar: state.thongtin.link_avatar,
        name: state.thongtin.name,
        isLogin: state.thongtin.isLogin,
    }
}

export default connect(mapStateToProps)(createAppContainer(DrawerNavi))