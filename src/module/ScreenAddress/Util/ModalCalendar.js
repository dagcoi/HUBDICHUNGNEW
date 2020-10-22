import React, { Component } from 'react'
import { View, Modal, SafeAreaView, Text } from 'react-native'

export default function ModalCalendar({ }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.dialogCalendarVisible}
        >
            <SafeAreaView style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}>
                <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center" }}>
                    <View style={{ flexDirection: 'row', margin: 16, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { this.setState({ dialogCalendarVisible: false }) }}
                        >
                            <Image
                                style={{ width: 20, height: 20, margin: 8 }}
                                source={require('../../../image/cancel.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Chọn thời gian đi</Text>
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

                {this.modalTime()}

            </SafeAreaView>
        </Modal>
    )
}