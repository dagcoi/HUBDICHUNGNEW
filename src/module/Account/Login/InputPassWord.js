import React, { Component } from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

const lock = '../../../image/lock.png'
const hide = '../../../image/hide.png'
const visibility = '../../../image/visibility.png'
const cancel = '../../../image/cancel.png'

function InputPassWord({
    placeholder,
    value,
    secureTextEntry,
    onChangeText,
    pressDelete,
    pressEye,
    imageLeft,
    noBorder,
    hidePass,
    styleRight,
}) {
    return (
        <View style={noBorder ? styles.borderBotView : styles.borderView}>
            {imageLeft ? <Image
                style={styles.icon}
                source={require(lock)}
            /> : null}
            <View style={[{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }, styleRight ? { borderTopWidth: 1, borderTopColor: '#e8e8e8' } : null]}>
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                    multiline={false}
                />
                <TouchableOpacity
                    onPress={pressDelete}
                ><Image
                        style={{ width: 20, height: 20, margin: 8 }}
                        source={value.length == 0 ? null : require(cancel)}
                    />
                </TouchableOpacity>
                {hidePass ??
                    <TouchableOpacity
                        onPress={pressEye}
                        style={styleRight}
                    >
                        <Image
                            style={{ width: 30, height: 30, margin: 8 }}
                            source={secureTextEntry ? require(visibility) : require(hide)}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    borderBotView: {
        borderBottomWidth: 0,
        borderColor: '#e8e8e8',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    borderView: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        width: 30,
        height: 30,
    },
    textInput: {
        padding: 8,
        fontSize: 16,
        borderRadius: 4,
        flex: 1,
    }
})

export default InputPassWord;