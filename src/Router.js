import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home1 from './module/Home1'
import MapDiChung from './module/DiChung/MapDiChung'
import InfoCustommer from './module/DiChung/InfoCustommer'
import SearchPlace from './module/DiChung/SearchPlace'
import ConfirmInformation from './module/DiChung/ConfirmInformation'
import ListCar from './module/DiChung/ListCar'
import TicketInformation from './module/DiChung/TicketInformation'
import PaymentOnline from './module/DiChung/PaymentOnline'
// import ListCarHourlyBooking from './module/DiChung/ListCarHourlyBooking'
// import InfoCustommerHourlyBooking from './module/DiChung/InfoCustommerHourlyBooking'
// import ConfirmInformationHB from './module/DiChung/ConfirmInformationHB'

import MapChungXe from './module/ChungXe/MapChungXe'
// import ListVehicle from './module/ChungXe/ListVehicle'
// import InfoChungXe from './module/ChungXe/InfoCarChungXe'
// import ConfirmInfoChungXe from './module/ChungXe/ConfirmInfoChungXe'
// import ChungXeTicketInformation from './module/ChungXe/ChungXeTicketInformation'

import MapXeChung from './module/XeChung/MapXeChung'
import MapExpress from './module/Express/MapExpress'
import MapDiChungTuLai from './module/DiChungTuLai/MapDiChungTuLai'

import SpecialRequirements from './module/SpecialRequirements/SpecialRequirements'

import AboutUs from './module/WebView/AboutUs'
import News from './module/WebView/News'
import FAQ from './module/WebView/FAQ'
import PoliciesAndServices from './module/WebView/PoliciesAndServices'

import Login from './module/Account/Login'
import Login2 from './module/Account/Login/LoginAuth'
import Profile from './module/Account/Profile'
import ListBooking from './module/ListBooking'
import DetailTicket from './module/ListBooking/DetailTicket.js'
import ListTrip from './module/DoiTac/ListTrip'

import MapTravel from './module/ScreenAddress/Travel'
import MapCombo from './module/ScreenAddress/Combo'
import MapFood from './module/ScreenAddress/Food'
import MapTruck from './module/ScreenAddress/Truck'
import Map from './module/Map'
import VeXeRe from './module/VeXeRe'
import RideShare from './module/ScreenAddress/RideShare'

import ListCarTaxiNow from './module/TaxiNow/ListCarTaxiNow'
import CustomerInfoTaxiNow from './module/TaxiNow/CustomerInfoTaxiNow'
import MapStartTrip from './module/TaxiNow/MapStartTrip'

import Confirm from './module/DoiTac/Screen/Confirm'
// import RideShareA from './module/DoiTac/Form/RideShare'
import HomeOperator from './module/DoiTac/Screen/Home'
import { createDrawerNavigator } from 'react-navigation-drawer'
import CustomNavigator from './component/CustomNavigator'
import { connect } from 'react-redux'
import TransferService from './module/DoiTac/Screen/TransferService'
import Express from './module/DoiTac/Screen/Express'
import CarRental from './module/DoiTac/Screen/CarRental'
import ConfirmRideShare from './module/DoiTac/Screen/ConfirmRideShare'
import CreateRideShare from './module/DoiTac/Screen/CreateRideShare'

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
            header: null,
        }
    }
})

const RootStack = createStackNavigator({

    Home: {
        screen: Home1,
        navigationOptions: {
            header: null,
        },
    },

    Map: {
        screen: Map,
        navigationOptions: {
            header: null,
        },
    },

    ListCarTaxiNow: {
        screen: ListCarTaxiNow,
        navigationOptions: {
            header: null,
        },
    },

    MapStartTrip: {
        screen: MapStartTrip,
        navigationOptions: {
            header: null,
        },
    },

    CustomerInfoTaxiNow: {
        screen: CustomerInfoTaxiNow,
        navigationOptions: {
            header: null,
        },
    },

    MapTravel: {
        screen: MapTravel,
        navigationOptions: {
            header: null,
        },
    },

    MapFood: {
        screen: MapFood,
        navigationOptions: {
            header: null,
        },
    },

    MapCombo: {
        screen: MapCombo,
        navigationOptions: {
            header: null,
        },
    },

    MapTruck: {
        screen: MapTruck,
        navigationOptions: {
            header: null,
        },
    },

    VeXeRe: {
        screen: VeXeRe,
        navigationOptions: {
            header: null,
        },
    },

    MapDiChung: {
        screen: MapDiChung,
        navigationOptions: {
            header: null,
        },
    },

    ConfirmInformation: {
        screen: ConfirmInformation,
        navigationOptions: {
            header: null,
        }
    },

    InfoCustommer: {
        screen: InfoCustommer,
        navigationOptions: {
            header: null,
        }
    },

    ListCar: {
        screen: ListCar,
        navigationOptions: {
            header: null,
        }
    },

    // ListCarHourlyBooking: {
    //     screen: ListCarHourlyBooking,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },

    // InfoCustommerHourlyBooking: {
    //     screen: InfoCustommerHourlyBooking,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },

    // ConfirmInformationHB: {
    //     screen: ConfirmInformationHB,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },

    PaymentOnline: {
        screen: PaymentOnline,
        navigationOptions: {
            header: null,
        }
    },

    MapChungXe: {
        screen: MapChungXe,
        navigationOptions: {
            header: null,
        },
    },

    // ListVehicle: {
    //     screen: ListVehicle,
    //     navigationOptions: {
    //         header: null,
    //     },
    // },

    // InfoChungXe: {
    //     screen: InfoChungXe,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },

    // ConfirmInfoChungXe: {
    //     screen: ConfirmInfoChungXe,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },

    TicketInformation: {
        screen: TicketInformation,
        navigationOptions: {
            header: null,
        }
    },

    // ChungXeTicketInformation: {
    //     screen: ChungXeTicketInformation,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },

    MapXeChung: {
        screen: MapXeChung,
        navigationOptions: {
            header: null,
        },
    },

    MapExpress: {
        screen: MapExpress,
        navigationOptions: {
            header: null,
        },
    },

    RideShare: {
        screen: RideShare,
        navigationOptions: {
            header: null,
        },
    },
    SpecialRequirements: {
        screen: SpecialRequirements,
        navigationOptions: {
            header: null,
        },
    },

    MapDiChungTuLai: {
        screen: MapDiChungTuLai,
        navigationOptions: {
            header: null,
        },
    },
    SearchPlace: {
        screen: SearchPlace,
        navigationOptions: {
            header: null,
        }
    },
})

const Profiles = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },

    Login2: {
        screen: Login2,
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

const StackRideShare = createStackNavigator({
    HomeOperator: {
        screen: HomeOperator,
        navigationOptions: {
            header: null,
        }
    },

    TransferServiceOperator: {
        screen: TransferService,
        navigationOptions: {
            header: null,
        }
    },

    CarRentalOperator: {
        screen: CarRental,
        navigationOptions: {
            header: null,
        }
    },

    ExpressOperator: {
        screen: Express,
        navigationOptions: {
            header: null,
        }
    },

    Confirm: {
        screen: Confirm,
        navigationOptions: {
            header: null,
        }
    },
    ConfirmRideShare: {
        screen: ConfirmRideShare,
        navigationOptions: {
            header: null,
        }
    },
    CreateRideShare: {
        screen: CreateRideShare,
        navigationOptions: {
            header: null,
        }
    },

    SearchPlace: {
        screen: SearchPlace,
        navigationOptions: {
            header: null,
        }
    },


})

const ListTripDetail = createStackNavigator({
    ListTrip: {
        screen: ListTrip,
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

    StackRideShare: {
        screen: StackRideShare,
        navigationOptions: {
            title: 'Cho thuê xe',
            alignItems: 'center'
        }
    },

    ListBooking: {
        screen: ListBookingDetail,
        navigationOptions: () => {
            return {
                drawerLabel: () => 'Danh sách vé',
            }
        }
    },

    ListTripDetails: {
        screen: ListTripDetail,
        navigationOptions: () => {
            return {
                drawerLabel: () => 'Danh sách chuyến tạo'
            }
        }
    },

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

    Profiles: {
        screen: Profiles,
        navigationOptions: () => {
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

// const StackMain = createStackNavigator({
//     Main: {
//         screen: DrawerNavi,
//         navigationOptions: {
//             header: null
//         }
//     },
//     SearchPlace: {
//         screen: SearchPlace,
//         navigationOptions: {
//             header: null,
//         }
//     },
// })

function mapStateToProps(state) {
    return {
        link_avatar: state.thongtin.link_avatar,
        name: state.thongtin.name,
        isLogin: state.thongtin.isLogin,
    }
}

export default connect(mapStateToProps)(createAppContainer(DrawerNavi))