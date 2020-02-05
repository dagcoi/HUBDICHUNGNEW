import React, { Component } from 'react'
import { View, Image } from 'react-native';
import CheckBox from 'react-native-check-box'

const imageCheck = '../../image/checked.png'
const imageUnCheck = '../../image/unchecked.png'

function CheckBoxList({
    onClick,
    isChecked,
    rightText,
}) {
    return (
        <View>
            <CheckBox
                style={{ marginTop: 8 }}
                onClick={onClick}
                isChecked={isChecked}
                rightText={rightText}
                rightTextStyle={{ fontSize: 20 }}
                checkedImage={<Image source={require(imageCheck)} style={{ width: 25, height: 25 }} />}
                unCheckedImage={<Image source={require(imageUnCheck)} style={{ width: 25, height: 25 }} />}
            />
        </View>
    )
}

export default CheckBoxList;