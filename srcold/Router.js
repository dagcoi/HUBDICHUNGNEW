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

import MapChungXe from './module/ChungXe/MapChungXe'
import ListVehicle from './module/ChungXe/ListVehicle'
import InfoChungXe from './module/ChungXe/InfoCarChungXe'
import ConfirmInfoChungXe from './module/ChungXe/ConfirmInfoChungXe'
import ChungXeTicketInformation from './module/ChungXe/ChungXeTicketInformation'

import AboutUs from './module/WebView/AboutUs'
import News from './module/WebView/News'
import FAQ from './module/WebView/FAQ'
import PoliciesAndServices from './module/WebView/PoliciesAndServices'

import SearchTicket from './module/SearchTicket'

import { createDrawerNavigator } from 'react-navigation-drawer'


// import OTP from './module/OTP'
// import { createDrawerNavigator } from 'react-navigation-drawer'

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

    ConfirmInformation: {
        screen: ConfirmInformation,
        navigationOptions: {
            title: 'Xác nhận thông tin',
            alignItems: 'center',
            
        }
    },

    InfoCustommer: {
        screen: InfoCustommer,
        navigationOptions: {
            title: 'Thông tin đặt xe',
            alignItems: 'center',
        }
    },

    ListCar: {
        screen: ListCar,
        navigationOptions: {
            title: 'Chọn xe',
            alignItems: 'center',
        }
    },

    SearchPlace: {
        screen: SearchPlace,
        navigationOptions: {
            title: 'Nhập địa chỉ',
            alignItems: 'center',
        }
    },

    // Map: {
    //     screen: Map,
    //     navigationOptions: {
    //         title: 'Thuê xe tự lái',
    //         alignItems: 'center',
    //     },
    // },
    MapDiChung: {
        screen: MapDiChung,
        navigationOptions: {
            title: 'Thuê xe taxi',
            alignItems: 'center',
        },
    },

    MapChungXe: {
        screen: MapChungXe,
        navigationOptions: {
            title: 'Thuê xe tự lái',
            alignItems: 'center',
        }
    },

    ListVehicle: {
        screen: ListVehicle,
        navigationOptions: {
            title: 'Danh sách xe',
            alignItems: 'center',
        },
    },

    InfoChungXe: {
        screen: InfoChungXe,
        navigationOptions: {
            title: 'Thông tin',
            alignItems: 'center',
        }
    },

    ConfirmInfoChungXe: {
        screen: ConfirmInfoChungXe,
        navigationOptions: {
            title: 'Xác nhận thông tin',
            alignItems: 'center',
        }
    },

    TicketInformation: {
        screen: TicketInformation,
        navigationOptions: {
            header: null,
        }
    },

    ChungXeTicketInformation : {
        screen :  ChungXeTicketInformation,
        navigationOptions : {
            header : null,
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

    SearchTicket : {
        screen : SearchTicket,
        navigationOptions : {
            title : 'Tra cứu mã vé',
            alignItems : 'center'
        }
    },

    AboutUs: {
        screen: AboutUs,
        navigationOptions: {
            title : 'Về chúng tôi',
            alignItems : 'center'
        },
    },
    News : {
        screen : News,
        navigationOptions: {
            title : 'Tin tức',
            alignItems : 'center'
        },
    },
    FAQ : {
        screen : FAQ,
        navigationOptions: {
            title : 'Câu hỏi thường gặp',
            alignItems : 'center'
        },
    },
    PoliciesAndServices : {
        screen : PoliciesAndServices,
        navigationOptions: {
            title : 'Chính sách vận chuyển',
            alignItems : 'center'
        },
    },
},{
    initialRouteName: 'Main',
    drawerPosition : 'left',
    drawerWidth : 300,
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

    Main : {
        screen : DrawerNavi,
        navigationOptions :{
            header : null,
        }
    }
})



export default createAppContainer(MainStack)