import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

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

import MapExpress from './module/Express/MapExpress'
import ListDriverExpress from './module/Express/ListDriverExpress'
import InfoCustommerExpress from './module/Express/InfoCustommerExpress'
import ConfirmInformationExpress from './module/Express/ConfirmInformationExpress'
import TicketInformationExpress from './module/Express/TicketInformationExpress'

import AboutUs from './module/WebView/AboutUs'
import News from './module/WebView/News'
import FAQ from './module/WebView/FAQ'
import PoliciesAndServices from './module/WebView/PoliciesAndServices'

import SearchTicket from './module/SearchTicket'
import Login from './module/Account/Login'
import Registration from './module/Account/Registration'

import { createDrawerNavigator } from 'react-navigation-drawer'


// import OTP from './module/OTP'
// import { createDrawerNavigator } from 'react-navigation-drawer'

const RootStack = createStackNavigator({

    Login : {
        screen : Login,
        navigationOptions : {
            header : null,
        }
    },

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
        }
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
    },

    ListDriverXeChung: {
        screen: ListDriverXeChung,
        navigationOptions: {
            title: 'Danh sách lái xe',
        }
    },

    InfoCustommerXeChung : {
        screen : InfoCustommerXeChung,
        navigationOptions : {
            title : 'Thông tin khách hàng',
        }
    },

    ConfirmInformationXeChung : {
        screen : ConfirmInformationXeChung,
        navigationOptions : {
            title : 'Xác nhận thông tin'
        }
    },
    TicketInformationXeChung : {
        screen : TicketInformationXeChung,
        navigationOptions : {
            header : null,
        }
    },

    MapExpress: {
        screen: MapExpress,
        navigationOptions: {
            title: 'Vận chuyển hàng hóa',
        },
    },

    ListDriverExpress: {
        screen: ListDriverExpress,
        navigationOptions: {
            title: 'Danh sách dịch vụ',
        }
    },

    InfoCustommerExpress : {
        screen : InfoCustommerExpress,
        navigationOptions : {
            title : 'Thông tin khách hàng',
        }
    },

    ConfirmInformationExpress : {
        screen : ConfirmInformationExpress,
        navigationOptions : {
            title : 'Xác nhận thông tin'
        }
    },
    TicketInformationExpress : {
        screen : TicketInformationExpress,
        navigationOptions : {
            header : null,
        }
    },

    Registration : {
        screen : Registration,
        navigationOptions : {
            title : 'Đăng kí',
        }
    }

})

const DrawerNavi = createDrawerNavigator({
    Main: {
        screen: RootStack,
        navigationOptions: {
            title: 'Đặt xe',
            alignItems: 'center'
        }
    },

    SearchTicket: {
        screen: SearchTicket,
        navigationOptions: {
            title: 'Tra cứu mã vé',
            alignItems: 'center'
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
}, {
    initialRouteName: 'Main',
    drawerPosition: 'left',
    drawerWidth: 300,
    contentOptions: {
        activeTintColor: '#77a300',
    }
})

const MainStack = createStackNavigator({

    // Splash: {
    //     screen: Splash,
    //     navigationOptions: {
    //         header: null,
    //     },
    // },

    Main: {
        screen: DrawerNavi,
        navigationOptions: {
            header: null,
        }
    }
})


// const defaultGetStateForAction = PrimaryNavigation.router.getStateForAction;
// PrimaryNavigation.router.getStateForAction = (action, state) => {
//     if (Platform.OS === "android") {
//         const screen = state ? state.routes[state.index] : null;
//         if (
//             action.type === NavigationActions.BACK &&
//             screen &&
//             (screen.routeName === "Register" || screen.routeName === "OwnerDashboard" || screen.routeName === "LandingPage" || screen.routeName === "OptionPage" || (screen.routeName === "loginStack" && screen.index == 0) || (screen.routeName === "driverStack" && screen.index == 0 && screen.routes[screen.index].index == 0)
//                 || (screen.routeName === "ownerStack" && screen.index == 0 && screen.routes[screen.index].index == 0))
//         ) {
//             Alert.alert(
//                 "Are you sure",
//                 "You want to exit the App",
//                 [
//                     {
//                         text: "Cancel",
//                         onPress: () => console.log("Cancel Pressed"),
//                         style: "cancel"
//                     },
//                     { text: "OK", onPress: () => { BackHandler.exitApp() } }
//                 ],
//                 { cancelable: false }
//             );
//             console.log("action", action, "state", state);
//             return null;
//         }
//         else {
//             return defaultGetStateForAction(action, state);
//         }
//     }
//     else {
//         return defaultGetStateForAction(action, state);
//     }
// };


export default createAppContainer(MainStack)