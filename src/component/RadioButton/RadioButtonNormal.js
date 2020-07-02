import { View } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import React, { Component } from 'react'
function RadioButtonNormal({ onPressItem, isSelected, obj, i }) {
    return (
        <RadioButton labelHorizontal={true} key={i} >
            <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={isSelected === obj.value}
                onPress={onPressItem}
                borderWidth={1}
                buttonInnerColor={'#77a300'}
                buttonOuterColor={'#77a300'}
                buttonSize={10}
                buttonOuterSize={16}
                buttonStyle={7}
                buttonWrapStyle={{ marginLeft: 10 }}
            />
            <RadioButtonLabel
                obj={obj}
                index={i}
                key={i}
                labelHorizontal={true}
                onPress={onPressItem}
                labelStyle={{ fontSize: 14, color: '#000' }}
            />
        </RadioButton>
    )
}

export default RadioButtonNormal;