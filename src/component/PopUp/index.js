import React, { Component } from 'react'
import { Modal, View, Image, Text, TouchableOpacity } from 'react-native'

function PopUp({
    textTitle,
    textMessage,
    textButtonLeft,
    textButtonRight,
    TextButtonCener,
    onPressLeft,
    onPressRight,
    onPressCenter,
    source,
    showModal,
}) {
    return (
        <Modal
            visible={showModal}
            transparent={true}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#000000AA' }}>
                <View style={{ width: '80%', justifyContent: 'center', borderRadius: 8, minHeight: 100, backgroundColor: '#fff', padding: 8 }}>
                    {textTitle ?
                        <View style={{ borderBottomWidth: 1, borderColor: '#e8e8e8', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 20, }}>{textTitle}</Text>
                        </View> : null}
                    <View></View>
                    <View style={{ padding: 8 }}>
                        {source == null ? null :
                            <Image
                                style={{ width: 180, height: 150 }}
                                source={source}
                            />
                        }
                        <Text><Text>{textMessage}</Text></Text>
                    </View>

                    <View style={{ flexDirection: 'row', height: 56, alignItems: 'center', justifyContent: 'center' }}>
                        {textButtonLeft ?
                            <TouchableOpacity
                                onPress={onPressLeft}
                                style={{ backgroundColor: '#77a300', margin: 4, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                                <Text style={{ color: '#fff' }}>{textButtonLeft}</Text>
                            </TouchableOpacity> : null}
                        {TextButtonCener ?
                            <TouchableOpacity
                                onPress={onPressCenter}
                                style={{ backgroundColor: '#77a300', margin: 4, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                                <Text style={{ color: '#fff' }}>{TextButtonCener}</Text>
                            </TouchableOpacity> : null}
                        {textButtonRight ?
                            <TouchableOpacity
                                onPress={onPressRight}
                                style={{ backgroundColor: '#77a300', margin: 4, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                                <Text style={{ color: '#fff' }}>{textButtonRight}</Text>
                            </TouchableOpacity> : null}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default PopUp;