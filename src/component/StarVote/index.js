import React from 'react'
import { View, Image, Text } from 'react-native';

const starfull = '../../image/star_full.png'
const starhalf = '../../image/star_half.png'
const starempty = '../../image/star_empty.png'
function StarVote({
    number,
    margin,
}) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline', marginBottom: 4, marginTop: 4 }}>
            <Image
                style={{ height: 18, width: 18, resizeMode: 'contain' }}
                source={number >= 1 ? require(starfull) : number > 0 ? require(starhalf) : require(starempty)}
            />
            <View style={{ margin: margin ?? 0 }} />
            <Image
                style={{ height: 18, width: 18, resizeMode: 'contain' }}
                source={number >= 2 ? require(starfull) : number > 1 ? require(starhalf) : require(starempty)}
            />
            <View style={{ margin: margin ?? 0 }} />
            <Image
                style={{ height: 18, width: 18, resizeMode: 'contain' }}
                source={number >= 3 ? require(starfull) : number > 2 ? require(starhalf) : require(starempty)}
            />
            <View style={{ margin: margin ?? 0 }} />
            <Image
                style={{ height: 18, width: 18, resizeMode: 'contain' }}
                source={number >= 4 ? require(starfull) : number > 3 ? require(starhalf) : require(starempty)}
            />
            <View style={{ margin: margin ?? 0 }} />
            <Image
                style={{ height: 18, width: 18, resizeMode: 'contain' }}
                source={number == 5 ? require(starfull) : number > 4 ? require(starhalf) : require(starempty)}
            />
        </View>
    )
}

export default StarVote;