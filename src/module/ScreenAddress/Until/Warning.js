import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Dialog, { } from 'react-native-popup-dialog';
import { ButtonDialog } from '../../../component/Button'

function Warning({ visible, onPress, textWarning }) {
    return (
        <Dialog
            visible={visible}
            width={0.8}
        >
            <View style={{ padding: 8, marginTop: 8, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 16, fontWeight: '100' }}>{textWarning}</Text>
                <ButtonDialog
                    text={'Đồng ý'}
                    onPress={onPress}
                />
            </View>
        </Dialog>
    )
}

export default Warning;