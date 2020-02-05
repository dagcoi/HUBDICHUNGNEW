import React, { Component } from 'react'
import { View, Image } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

function Calendar({
    minDate,
    onDateChange,
}) {
    return (
        <View>
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
                onDateChange={onDateChange}

            />
        </View>
    )
}

export default Calendar;