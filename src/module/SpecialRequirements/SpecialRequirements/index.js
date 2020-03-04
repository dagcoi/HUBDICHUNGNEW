import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Modal, Text, Image, FlatList, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import InputTextDiChung from '../../../component/InputTextDiChung'
import TimePicker from '../../DiChung/MapDiChung/TimePicker'
import * as link from '../../../URL'
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux'
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import { deleteData, deleteDataTaixe, deleteDataVanChuyen, } from '../../../core/Redux/action/Action'
import { NavigationActions, StackActions } from 'react-navigation';

const imageCancel = '../../../image/cancel.png'

class SpecialRequirements extends Component {

    constructor() {
        super();
        this.state = {
            full_name: '',
            use_phone: '',
            email: '',
            mobile_validate: false,
            time_pick: '',
            selectedHours: 0,
            selectedMinutes: 0,
            day_tour: '',
            people: '',
            carType: '',
            carName: '',
            address: '',
            note: '',
            dialogCalendarVisible: false,
            dialogTimeVisible: false,
            modalCarType: false,
            listCarType: [
                { 'id': '1', 'carName': 'Xe 4 chỗ (Toyota Vios hoặc tương tự)' },
                { 'id': '2', 'carName': 'Xe 7 chỗ (Toyota Innova hoặc tương tự)' },
                { 'id': '24', 'carName': 'Xe 16 chỗ (Ford Transit hoặc tương tự)' },
                { 'id': '9', 'carName': 'Xe 29 chỗ (Huyndai County hoặc tương tự)' },
                { 'id': '34', 'carName': 'Xe 35 chỗ (Samco Isuzu hoặc tương tự)' },
                { 'id': '26', 'carName': 'Xe 45 chỗ (Huyndai Universe hoặc tương tự)' },
            ],
            isLoading: false,
            bookingSuccess: '',
        }
    }

    checkData() {
        if (this.state.full_name.trim().length < 2) {
            Alert.alert('Vui lòng điền đúng họ tên')
            return;
        }
        if (!this.state.mobile_validate) {
            Alert.alert(`Vui lòng nhập đúng Số điện thoại`);
            return;
        }
        if (this.state.time_pick.trim() == '') {
            Alert.alert('Vui lòng chọn thời gian')
            return;
        }
        if (this.state.carType == '') {
            Alert.alert('Vui lòng chọn loại xe')
            return;
        }
        if (this.state.people == '') {
            Alert.alert('Vui lòng nhập số người đi')
            return;
        }
        if (this.state.day_tour == '') {
            Alert.alert('Vui lòng chọn số ngày thuê')
            return;
        }
        if (this.state.note == '') {
            Alert.alert('Vui lòng nhập lộ trình của bạn')
            return;
        }
        this.setState({
            isLoading: true,
        })
        this.sentSpecialRequirements()
    }

    async sentSpecialRequirements() {
        const pick_add = this.props.pick_add;

        const url = link.URL_API + `home/add_new_special_request`
        const formData = new FormData();
        formData.append('name', this.state.full_name)
        formData.append('email', this.state.email)
        formData.append('phone_number', this.state.use_phone)
        formData.append('in_date', this.state.time_pick)
        formData.append('passenger', this.state.people)
        formData.append('total_day', this.state.day_tour)
        formData.append('pick_address', pick_add)
        formData.append('vehicle', this.state.carType)
        formData.append('trip_detail', this.state.note)

        console.log(formData)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "multipart/form-data",
            },
            body: formData
        });
        const responseJson = await response.json();
        this.setState({
            isLoading: false,
            bookingSuccess: responseJson.code,
        });
        return responseJson.data;
    }


    mobileValidate(text) {
        var test = text.trim();
        const reg = /^[0]?[3789]\d{8}$/;
        if (reg.test(test) === false) {
            this.setState({
                mobile_validate: false,
                use_phone: test,
            });
            return false;
        } else {
            this.setState({
                mobile_validate: true,
                use_phone: test,
            });
            return true;
        }
    }

    gotoSearchPlaceSR() {
        const { navigation } = this.props;
        const screen = navigation.getParam('screen');
        if (screen == 'DiChung') {
            this.props.navigation.push("SearchPlace", {
                'search': 'Pick',
                'placeholder': 'Nhập địa chỉ YCDB'
            })
        }
        if (screen == 'TaiXe') {
            this.props.navigation.push("SearchPlaceXeChung", {
                'search': 'Pick',
                'placeholder': 'Nhập địa chỉ YCDB'
            })
        }
        if (screen == 'VanChuyen') {
            this.props.navigation.push("SearchPlaceExpress", {
                'search': 'Pick',
                'placeholder': 'Nhập địa chỉ YCDB'
            })
        }
    }

    render() {
        const minDate = new Date();
        const pick_add = this.props.pick_add;
        return (
            <View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ padding: 8, backgroundColor: '#77a300' }}>
                        <Text style={{ fontSize: 25, color: '#fff', fontWeight: 'bold' }}>Đi Chung cung cấp dịch vụ đặc biệt:</Text>
                        <Text style={{ fontSize: 16, color: '#fff' }}>Thuê xe nhiều ngày </Text>
                        <Text style={{ fontSize: 16, color: '#fff' }}>Đặt xe trọn gói (tour) </Text>
                        <Text style={{ fontSize: 16, color: '#fff' }}>Đặt xe theo lịch trình của bạn </Text>
                        <Text style={{ fontSize: 16, color: '#fff' }}>Các dòng xe từ 4 - 45 chỗ</Text>
                        <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Bắt đầu hành trình của bạn cùng Đi Chung!</Text>
                    </View>
                    <View style={{ padding: 8 }}>
                        <Text style={styles.textBig}>Họ và tên</Text>
                        <InputTextDiChung
                            placeholder='Nhập họ tên'
                            value={this.state.full_name}
                            onChangeText={(text) => this.setState({
                                full_name: text,
                            })}
                            onPress={() => this.setState({
                                full_name: ''
                            })}
                        />

                        <Text style={styles.textBig}>Số điện thoại</Text>
                        <InputTextDiChung
                            placeholder='Nhập số điện thoại'
                            value={this.state.use_phone}
                            onChangeText={(text) => this.mobileValidate(text)}

                            onPress={() => this.setState({
                                use_phone: ''
                            })}
                            keyboardType={'numeric'}
                        />

                        <Text style={styles.textBig}>Email</Text>
                        <InputTextDiChung
                            placeholder='Nhập email'
                            value={this.state.email}
                            onChangeText={(text) => this.setState({
                                email: text,
                            })}
                            onPress={() => this.setState({
                                email: ''
                            })}
                        />

                        <Text style={styles.textBig}>Chọn thời gian</Text>
                        <TouchableOpacity
                            style={{ marginTop: 8, borderWidth: 0.5, borderColor: '#00363d', borderRadius: 8, flexDirection: 'row', justifyContent: "center", alignItems: "center", }}
                            onPress={() => {
                                this.setState({
                                    dialogCalendarVisible: true,
                                })
                            }}
                        >
                            <TextInput
                                placeholder='Chọn thời gian'
                                style={{ padding: 8, fontSize: 16, borderRadius: 8, flex: 1, }}
                                value={this.state.time_pick}
                                onTouchStart={() => {
                                    this.setState({
                                        dialogCalendarVisible: true,
                                    })
                                }}
                            />
                        </TouchableOpacity>

                        <Text style={styles.textBig}>Số ngày</Text>
                        <InputTextDiChung
                            placeholder='Nhập số ngày'
                            value={this.state.day_tour}
                            keyboardType={'number'}
                            onChangeText={(text) => this.setState({
                                day_tour: text,
                            })}
                            onPress={() => this.setState({
                                day_tour: ''
                            })}
                            keyboardType={'numeric'}
                        />

                        <Text style={styles.textBig}>Số người</Text>
                        <InputTextDiChung
                            placeholder='Nhập số người'
                            value={this.state.people}
                            onChangeText={(text) => this.setState({
                                people: text,
                            })}
                            onPress={() => this.setState({
                                people: ''
                            })}
                            keyboardType={'numeric'}
                        />

                        <Text style={styles.textBig}>Loại xe</Text>

                        <TouchableOpacity
                            style={{ marginTop: 8, borderWidth: 0.5, borderColor: '#00363d', borderRadius: 8, flexDirection: 'row', justifyContent: "center", alignItems: "center", }}
                            onPress={() => {
                                this.setState({
                                    modalCarType: true,
                                })
                            }}
                        >
                            <TextInput
                                placeholder='Chọn loại xe'
                                style={{ padding: 8, fontSize: 16, borderRadius: 8, flex: 1, }}
                                value={this.state.carName}
                                onTouchStart={() => {
                                    this.setState({
                                        modalCarType: true,
                                    })
                                }}
                            />
                        </TouchableOpacity>

                        <Text style={styles.textBig}>Địa chỉ</Text>
                        {/* <InputTextDiChung
                            placeholder='Nhập điểm xuất phát'
                            value={this.state.address}
                            onChangeText={(text) => this.setState({
                                address: text,
                            })}
                        /> */}

                        <TouchableOpacity
                            style={{ marginTop: 8, borderWidth: 0.5, borderColor: '#00363d', borderRadius: 8, flexDirection: 'row', justifyContent: "center", alignItems: "center", }}
                            onPress={() => this.gotoSearchPlaceSR()}
                        >
                            <TextInput
                                placeholder='Nhập điểm xuất phát'
                                style={{ padding: 8, fontSize: 16, borderRadius: 8, flex: 1, }}
                                value={pick_add}
                                onTouchStart={() => this.gotoSearchPlaceSR()}
                            />
                        </TouchableOpacity>

                        <Text style={styles.textBig}>Lịch trình chuyến đi</Text>
                        <InputTextDiChung
                            placeholder={`06:30 sáng đón tại Hà Nội đi Hạ Long \n14:30 từ Hạ Long đi Cát Bà \n18:00 từ Cát Bà về Hà Nội`}
                            value={this.state.note}
                            onChangeText={(text) => this.setState({
                                note: text,
                            })}
                            onPress={() => this.setState({
                                note: ''
                            })}
                            multiline={true}
                        />

                        <TouchableOpacity
                            style={{ padding: 8, margin: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#77a300' }}
                            onPress={() => {
                                this.checkData()
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold', }}>Gửi yêu cầu</Text>
                        </TouchableOpacity>

                        <Dialog
                            visible={this.state.isLoading}
                            title="">
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' />
                            </View>
                        </Dialog>

                        <ConfirmDialog
                            visible={this.state.bookingSuccess == 'success'}
                            negativeButton={{
                                title: 'Trang chủ',
                                onPress: () => {
                                    this.setState({
                                        bookingSuccess: 'successed'
                                    })
                                    this.props.deleteDataTaixe();
                                    this.props.deleteData();
                                    this.props.deleteDataVanChuyen();
                                    // this.props.navigation.push("Home");
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        key: null,
                                        actions: [NavigationActions.navigate({ routeName: 'Main' })],
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                }
                            }}
                            title="Gửi yêu cầu thành công">
                            <View style={{ flexDirection: 'column', }}>
                                <Text>Yêu cầu của bạn đã được hệ thống ghi nhận. Chúng tôi sé liên lạc trong thời gian sớm nhất.</Text>
                            </View>
                        </ConfirmDialog>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.dialogCalendarVisible}
                        onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}>
                            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center" }}>
                                <View style={{ flexDirection: 'row', margin: 16 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({
                                            dialogCalendarVisible: false
                                        })}
                                    >
                                        <Image
                                            style={{ width: 30, height: 30, }}
                                            source={require(imageCancel)}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#77a300', flex: 1, textAlign: 'center' }}>Chọn thời gian đi</Text>
                                </View>
                                <CalendarPicker
                                    textStyle={{
                                        color: '#000000',
                                        fontSize: 14,
                                    }}
                                    weekdays={['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN',]}
                                    months={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
                                    previousTitle="Trước"
                                    nextTitle="Sau"
                                    allowRangeSelection={false}
                                    minDate={minDate}
                                    startFromMonday={true}
                                    // todayBackgroundColor="#00363d"
                                    selectedDayColor="#77a300"
                                    selectedDayTextColor="#FFFFFF"
                                    dayShape='cicle'

                                    onDateChange={(date) => {
                                        this.setState({
                                            date: date,
                                            dialogTimeVisible: true,
                                        })
                                    }}

                                />
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.dialogTimeVisible}
                        onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: 10,
                        }}>
                            <View style={{ flex: 2, }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ dialogTimeVisible: !this.state.dialogTimeVisible })}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center", padding: 10 }}>
                                <Text style={{ color: '#00363d', fontSize: 18, fontWeight: 'bold' }}>Chọn giờ đi</Text>
                                <TimePicker
                                    selectedHours={this.state.selectedHours}
                                    selectedMinutes={this.state.selectedMinutes}
                                    onChange={(hours, minutes) => {
                                        this.setState({ selectedHours: hours, selectedMinutes: minutes, })
                                    }}
                                />
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                dialogCalendarVisible: false,
                                                dialogTimeVisible: false,
                                                time_pick: `${this.state.selectedHours < 10 ? '0' + this.state.selectedHours : this.state.selectedHours}:${this.state.selectedMinutes == 0 ? '00' : this.state.selectedMinutes} ${this.state.date.format('DD/MM/YYYY')}`
                                            })
                                        }}
                                    >
                                        <Text style={{ textAlign: "right", backgroundColor: "#77a300", color: '#fff', padding: 8, borderRadius: 4, fontSize: 16 }}>Tiếp tục</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalCarType}
                        onOrientationChange={true}
                        onRequestClose={() => {
                            console.log('a');
                        }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity
                                    onPress={() => this.setModalVisible(!this.state.modalCarType)}
                                    style={{ flex: 1 }}
                                ></TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                                data={this.state.listCarType}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', borderBottomColor: '#00363d', borderWidth: 0.2 }}
                                        onPress={() => this.setState({
                                            carType: item.id,
                                            carName: item.carName,
                                            modalCarType: false,
                                        })}
                                    >
                                        <Text style={{ fontSize: 18, flex: 1, padding: 8, color: item.carName === this.state.carName ? '#77a300' : '#00363d' }}>{item.carName}</Text>
                                    </TouchableOpacity>}
                                keyExtractor={item => item.city_id}
                            />

                        </View>
                    </Modal>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textBig: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
});

function mapStateToProps(state) {
    return {
        pick_add: state.dacbiet.pick_add,
    }
}

export default connect(mapStateToProps, { deleteData: deleteData, deleteDataTaixe: deleteDataTaixe, deleteDataVanChuyen, deleteDataVanChuyen })(SpecialRequirements);