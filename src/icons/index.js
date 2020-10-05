import * as React from "react"
import { View, StyleSheet, } from 'react-native'
import Svg, { Path, Defs, G, ClipPath, Text, Mask, Use } from "react-native-svg"

const colorDefault = '#00363d'
const colorGreen = '#77a300'
const colorRed = '#eb6752'
const colorBlue = '#20a8b9'

function SvgPick(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}

function SvgBulletPoints(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                color="#333"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M19 13H5v-2h14v2z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}

function SvgVehicle(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M12 4H5C3.34 4 2 5.34 2 7v8c0 1.66 1.34 3 3 3l-1 1v1h1l2-2.03L9 18v-5H4V5.98L13 6v2h2V7c0-1.66-1.34-3-3-3zM5 14c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm15.57-4.34c-.14-.4-.52-.66-.97-.66h-7.19c-.46 0-.83.26-.98.66L10 13.77l.01 5.51c0 .38.31.72.69.72h.62c.38 0 .68-.38.68-.76V18h8v1.24c0 .38.31.76.69.76h.61c.38 0 .69-.34.69-.72l.01-1.37v-4.14l-1.43-4.11zm-8.16.34h7.19l1.03 3h-9.25l1.03-3zM12 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}

function SvgClock(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </Svg>
        </View>
    )
}

function SvgPeople(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </Svg>
        </View>
    )
}

function SvgPosition(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
            </Svg>
        </View>
    )
}

function SvgArrowDown(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}


function SvgSwap(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                className="prefix__jss825"
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}

function SvgDuration(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                className="prefix__jss870"
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0012 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 007.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
            </Svg>
        </View>
    )
}

function SvgCity(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}

function SvgCar(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                color="#000"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}

function SvgCalendar(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}

function SvgPerson(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}

function SvgPhone(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
            </Svg>
        </View>
    )
}

function SvgMail(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}

function SvgNote(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M22 10l-6-6H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99l16-.01c1.1 0 2-.89 2-1.99v-8zm-7-4.5l5.5 5.5H15V5.5z" />
                <Path fill="none" d="M0 0h24v24H0V0z" />
            </Svg>
        </View>
    )
}

function SvgMoney(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z" />
            </Svg>
        </View>
    )
}

function SvgCheck(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </Svg>
        </View>
    )
}

function SvgCheckCircle(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z" />
                <Path fill={props.color ?? colorDefault} d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </Svg>
        </View>
    )
}
function SvgDescription(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </Svg>
        </View>
    )
}

function SvgArrowBack(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path d="M0 0h24v24H0z" fill="none" />
                <Path fill={props.color ?? colorDefault} d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
            </Svg>
        </View>
    )
}

function SvgCheckNormal(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </Svg>
        </View>
    )
}

function SvgTicket(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M22 10V6a2 2 0 00-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z" />
            </Svg>
        </View>
    )
}

function SvgPlane(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                // width={24}
                // height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill={props.color ?? colorDefault} d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                <Path fill="none" d="M0 0h24v24H0z" />
            </Svg>
        </View>
    )
}

function SvgCheckCircleBorder(props) {
    return (
        <View style={props.style ?? styles.styleMin}>
            <Svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </Svg>
        </View>
    )
}

function SvgCheckSuccess(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M19 1H5c-1.1 0-1.99.9-1.99 2L3 15.93c0 .69.35 1.3.88 1.66L12 23l8.11-5.41c.53-.36.88-.97.88-1.66L21 3c0-1.1-.9-2-2-2zm-9 15l-5-5 1.41-1.41L10 13.17l7.59-7.59L19 7l-9 9z" />
            </Svg>
        </View>
    )
}

function SvgSetting(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0V0z" />
                <Path fill={props.color ?? colorDefault} d="M19.14 12.936c.036-.3.06-.612.06-.936s-.024-.636-.072-.936l2.028-1.584a.496.496 0 00.12-.612l-1.92-3.324c-.12-.216-.372-.288-.588-.216l-2.388.96a7.03 7.03 0 00-1.62-.936l-.36-2.544a.479.479 0 00-.48-.408h-3.84a.467.467 0 00-.468.408l-.36 2.544a7.219 7.219 0 00-1.62.936l-2.388-.96a.475.475 0 00-.588.216l-1.92 3.324a.465.465 0 00.12.612l2.028 1.584c-.048.3-.084.624-.084.936s.024.636.072.936L2.844 14.52a.496.496 0 00-.12.612l1.92 3.324c.12.216.372.288.588.216l2.388-.96a7.03 7.03 0 001.62.936l.36 2.544c.048.24.24.408.48.408h3.84c.24 0 .444-.168.468-.408l.36-2.544a7.219 7.219 0 001.62-.936l2.388.96c.216.084.468 0 .588-.216l1.92-3.324a.465.465 0 00-.12-.612l-2.004-1.584zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </Svg>
        </View>
    )
}

function SvgTitle(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z" />
            </Svg>
        </View>
    )
}

function SvgNote2(props) {
    return (
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                aria-hidden="true"
                {...props}
            >
                <Path fill="none" d="M0 0h24v24H0z" />
                <Path fill={props.color ?? colorDefault} d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z" />

            </Svg>
        </View>
    )
}

function SvgDiChungXe(props) {
    return (
        <Svg width={props.width ?? 55} height={props.height ?? 73} viewBox="0 0 73.22 47.38" {...props}>
            <Path
                d="M29.09 18.41a10.6 10.6 0 00-5 1.18 8.61 8.61 0 00-3.45 3.23 8.9 8.9 0 00-1.22 4.61v2.1h-4.88a10.56 10.56 0 00-5 1.18 8.61 8.61 0 00-3.45 3.23 8.84 8.84 0 00-1.19 4.61v5.29H0v-5.37a14.69 14.69 0 011.85-7.37A13.08 13.08 0 017 26a15.09 15.09 0 017.51-1.85h.31A13.48 13.48 0 0116.4 20a13.14 13.14 0 015.17-5.1 15.23 15.23 0 017.52-1.9h15a15.19 15.19 0 017.51 1.84A13.17 13.17 0 0156.82 20a13.73 13.73 0 011.55 4.18h.3A15.13 15.13 0 0166.19 26a13 13 0 015.17 5.09 14.6 14.6 0 011.86 7.37v5.37h-4.91v-5.28a8.92 8.92 0 00-1.22-4.61 8.61 8.61 0 00-3.45-3.23 10.6 10.6 0 00-5-1.18h-4.9v-2.1a8.81 8.81 0 00-1.23-4.61 8.61 8.61 0 00-3.45-3.23 10.56 10.56 0 00-5-1.18z"
                fill={props.color ?? colorGreen}
            />
            <Path
                d="M15.33 47.38a6.72 6.72 0 116.72-6.72 6.73 6.73 0 01-6.72 6.72zm0-9.73a3 3 0 103 3 3 3 0 00-3-3zM57.89 47.38a6.72 6.72 0 10-6.72-6.72 6.73 6.73 0 006.72 6.72zm0-9.73a3 3 0 11-3 3 3 3 0 013-3zM47.41 38.94v4.9H25.82v-4.9z"
                fill={props.color ?? colorGreen}
            />
            <Text
                transform="translate(57.5 19.81)"
                fontSize={23.303}
                fill={props.color ?? colorGreen}
                fontWeight={700}
            >
                {"+"}
            </Text>
        </Svg>
    )
}


function SvgDiChungTaxi(props) {
    return (
        <Svg width={props.width ?? 55} height={props.height ?? 73} viewBox="0 0 73 42.24" {...props}>
            <Path
                d="M2.5 36.74v-4.48A10.43 10.43 0 0113 21.9h3.58v-3.37a7.84 7.84 0 017.9-7.79h24a7.85 7.85 0 017.9 7.79v3.37H60a10.43 10.43 0 0110.5 10.36v4.48"
                fill="none"
                stroke={props.color ?? colorGreen}
                strokeMiterlimit={10}
                strokeWidth={5}
            />
            <Path
                d="M20.5 34.74a5 5 0 11-5-5 5 5 0 015 5zM52.5 34.74a5 5 0 105-5 5 5 0 00-5 5zM27.5 34.74h18"
                fill="none"
                stroke={props.color ?? colorGreen}
                strokeMiterlimit={10}
                strokeWidth={5}
            />
            <Path
                fill="none"
                stroke={props.color ?? colorGreen}
                strokeMiterlimit={10}
                strokeWidth={3}
                d="M27.5 6.19l2.11-4.69h14.16l1.73 4.69"
            />
        </Svg>
    )
}

function SvgChungXe(props) {
    return (
        <Svg width={props.width ?? 55} height={props.height ?? 73} viewBox="0 0 73.22 52.83" {...props}>
            <Path
                d="M29.09 23.87a10.48 10.48 0 00-5 1.17 8.63 8.63 0 00-3.45 3.24 8.86 8.86 0 00-1.22 4.6V35h-4.88a10.56 10.56 0 00-5 1.18 8.61 8.61 0 00-3.41 3.22A8.81 8.81 0 004.9 44v5.3H0v-5.37a14.69 14.69 0 011.85-7.37A13.17 13.17 0 017 31.46a15.19 15.19 0 017.51-1.84h.31a13.48 13.48 0 011.55-4.18 13.14 13.14 0 015.17-5.1 15.23 15.23 0 017.52-1.84h15a15.19 15.19 0 017.51 1.84 13.17 13.17 0 015.18 5.1 13.73 13.73 0 011.55 4.18h.3a15.23 15.23 0 017.52 1.84 13.14 13.14 0 015.17 5.1 14.6 14.6 0 011.86 7.37v5.37h-4.84V44a8.9 8.9 0 00-1.22-4.61 8.61 8.61 0 00-3.45-3.23 10.6 10.6 0 00-5-1.18h-4.9v-2.1a8.78 8.78 0 00-1.23-4.6A8.63 8.63 0 0049.09 25a10.44 10.44 0 00-5-1.17z"
                fill={props.color ?? colorGreen}
            />
            <Path
                d="M15.33 52.83a6.72 6.72 0 116.72-6.72 6.73 6.73 0 01-6.72 6.72zm0-9.72a3 3 0 103 3 3 3 0 00-3-3zM57.89 52.83a6.72 6.72 0 10-6.72-6.72 6.72 6.72 0 006.72 6.72zm0-9.72a3 3 0 11-3 3 3 3 0 013-3zM47.41 44.4v4.9H25.82v-4.9zM5.14 24.34H1a1 1 0 01-1-.95V19.2a1 1 0 01.28-.67l8.2-8.19c-.23-.42-.45-.85-.64-1.29a3.82 3.82 0 01.79-4.22l3.74-3.72a3.82 3.82 0 014.05-.86 13.48 13.48 0 014.67 2.93 13.63 13.63 0 013 4.71 3.78 3.78 0 01-.86 4.11l-3.78 3.76a3.82 3.82 0 01-4.17.82 15.22 15.22 0 01-2-1 .95.95 0 111-1.62 11.94 11.94 0 001.71.87 1.92 1.92 0 002.1-.41l3.78-3.76a1.89 1.89 0 00.42-2 11.92 11.92 0 00-2.56-4 11.62 11.62 0 00-4-2.5 1.91 1.91 0 00-2 .43L10 6.18a1.87 1.87 0 00-.39 2.09 13.44 13.44 0 00.9 1.73 1 1 0 01-.14 1.17L1.9 19.6v2.84h2.28v-1.71a1 1 0 011-.95h1.67v-1.72a1 1 0 011-.95h2.66a1 1 0 010 1.9H8.75v1.72a1 1 0 01-1 .95H6.09v1.71a1 1 0 01-.95.95z"
                fill={props.color ?? colorGreen}
            />
        </Svg>
    )
}

function SvgXeChung(props) {
    return (
        <Svg width={props.width ?? 55} height={props.height ?? 73} viewBox="0 -8 47 70" {...props}>
            <Path
                d="M15.08 30.67l2.14 3.88 1.47 2.69c.8 1.45 1.67 1.72 3.22.93l-1.34 15.68H5.79a5.58 5.58 0 01-5.71-6.7c.46-3.1.86-6.22 1.29-9.33a4.29 4.29 0 013-3.75c3.47-1.16 7-2.26 10.45-3.38zM33.38 30.54c3.37 1 6.7 2 10 3a4 4 0 012.87 3.55c.49 3.56 1 7.12 1.36 10.69a5.3 5.3 0 01-5.45 6H28.09L26.75 38.2h.14c1.45.63 2.22.36 3-1l3.21-6zM23.25 0a21.29 21.29 0 018.59 1.52 7.6 7.6 0 012.74 2 4.52 4.52 0 011 4.15 2.14 2.14 0 01-1.93 1.8c-1.91 0-3.59 1-5.46 1.05s-3.79.27-5.68.24a30.82 30.82 0 01-7-1.2 6.46 6.46 0 00-1.32 0 1.51 1.51 0 01-.41-.09c-1.49-.56-2.12-1.82-1.84-3.6a5 5 0 012.25-3.36A13 13 0 0119.85.35c1.32-.2 2.65-.28 3.4-.35zm2.36 7.8a1.73 1.73 0 10-3.45-.11 1.71 1.71 0 001.71 1.75 1.64 1.64 0 001.74-1.64zM13.36 15.15c.28.45.5.85.77 1.2a8.83 8.83 0 004.56 3 16.17 16.17 0 0011.24-.39A8 8 0 0034 15.53s.07-.06.18-.14a6 6 0 01-.92 4.66c-.1.15-.25.33-.4.35-.62.1-.66.59-.8 1a11.57 11.57 0 01-3.84 5.78 7.25 7.25 0 01-10-.78 13.1 13.1 0 01-3.03-5.4c-.06-.2-.29-.36-.46-.51s-.53-.35-.69-.59a5.69 5.69 0 01-.68-4.75z"
                fill={props.color ?? colorGreen}
            />
            <Path
                d="M14.41 11.92a33.45 33.45 0 0018.71 0 3.19 3.19 0 01-.07 3.28 5.38 5.38 0 01-2.34 2.09A14.38 14.38 0 0116.54 17a6.38 6.38 0 01-1.86-1.73 3.11 3.11 0 01-.27-3.35zM17.79 27.48l6.72 5 5.82-5.15c.62.94 1.21 1.83 1.78 2.74a.59.59 0 010 .48q-1.66 3.15-3.34 6.28c-.45.83-1.17.84-1.68 0l-2.61-4.17-2.83 4.14a2.52 2.52 0 01-.38.47.83.83 0 01-1.32-.21c-1.21-2.16-2.4-4.34-3.58-6.51a.47.47 0 010-.4c.4-.88.89-1.72 1.42-2.67z"
                fill={props.color ?? colorGreen}
            />
            <Path
                d="M24.37 34.58a6.6 6.6 0 011 2.76c.37 4.69.82 9.37 1.24 14.06.07.8.13 1.6.2 2.44h-5.09c.05-.75.1-1.5.17-2.25.32-3.54.64-7.09.95-10.63.12-1.36.27-2.72.35-4.08.06-.88.74-1.47 1.18-2.3z"
                fill={props.color ?? colorGreen}
            />
        </Svg>
    )
}

function SvgTravel(props) {
    return (
        <Svg width={props.width ?? 55} height={props.height ?? 73} viewBox="-10 0 90 37.33" {...props}>
            <Path
                d="M57.59 37.33a6.69 6.69 0 10-6.69-6.69 6.69 6.69 0 006.69 6.69zm0-9.67a3 3 0 11-3 3 3 3 0 013-3zM15.25 37.33a6.69 6.69 0 116.69-6.69 6.69 6.69 0 01-6.69 6.69zm0-9.67a3 3 0 103 3 3 3 0 00-3-3zM25.68 33.81v-4.88h21.48v4.88z"
                fill={props.color ?? colorBlue}
            />
            <Path
                d="M50.78 5.34h7.59a10.59 10.59 0 014.94 1.17 8.53 8.53 0 013.43 3.22A8.72 8.72 0 0168 14.31v19.5h4.88V14.23A14.56 14.56 0 0071 6.9a13.15 13.15 0 00-5.15-5.07A15.21 15.21 0 0058.37 0h-43.9A15.18 15.18 0 007 1.83 13.15 13.15 0 001.84 6.9 14.56 14.56 0 000 14.23v19.58h4.88v-19.5A8.72 8.72 0 016.1 9.73a8.53 8.53 0 013.43-3.22 10.56 10.56 0 014.94-1.17h36.31z"
                fill={props.color ?? colorBlue}
            />
        </Svg>
    )
}


function SvgComboTravel(props) {
    return (
        <Svg width={props.width ?? 55} height={props.height ?? 73} viewBox="0 -5 30 50" {...props}>
            <Path
                d="M29.36 17.48v-2.06a13.87 13.87 0 00-1.74-6.95 12.51 12.51 0 00-4.88-4.8 14.39 14.39 0 00-7.1-1.74 14.41 14.41 0 00-7.09 1.74 12.49 12.49 0 00-4.87 4.8 13.78 13.78 0 00-1.75 7v2.06"
                fill="none"
                stroke={props.color ?? colorBlue}
                strokeLinejoin="bevel"
                strokeWidth={3.861}
            />
            <Path
                d="M15.64 22.79a7.14 7.14 0 10-7.14-7.14 7.15 7.15 0 007.14 7.14zm0-10.33a3.19 3.19 0 11-3.19 3.19 3.2 3.2 0 013.19-3.19z"
                fill={props.color ?? colorBlue}
            />
            <Path
                d="M1.93 21.38c0 12.16 13.71 18.11 13.71 18.11s13.72-6 13.72-18.11"
                fill="none"
                stroke={props.color ?? colorBlue}
                strokeLinejoin="bevel"
                strokeWidth={3.861}
            />
        </Svg>
    )
}

function SvgExpress(props) {
    return (
        <Svg width={props.width ?? 55} height={props.height ?? 73} viewBox="0 0 73.38 40.19" {...props}>
            <Defs>
                <ClipPath id="prefix__a">
                    <Path fill="none" d="M4.48 0h68.9v40.19H4.48z" />
                </ClipPath>
            </Defs>
            <Path
                fill={props.color ?? colorRed}
                d="M16.51 0h19.35v4.3H16.51zM9.87 0h4.3v4.3h-4.3zM16.13 8.56h6.96v4.3h-6.96zM9.5 8.56h4.3v4.3H9.5zM6.63 17.13H21.6v4.3H6.63zM0 17.13h4.3v4.3H0zM3.44 0h4.3v4.3h-4.3z"
            />
            <G clipPath="url(#prefix__a)">
                <Path
                    d="M62.67 40.19h-38.8a6.47 6.47 0 01-6.38-7.45l4.24-27.27A6.44 6.44 0 0128.12 0h38.8a6.47 6.47 0 016.38 7.45l-4.24 27.27a6.44 6.44 0 01-6.39 5.47zM28.12 4.31A2.14 2.14 0 0026 6.13L21.75 33.4a2.15 2.15 0 002.12 2.48h38.8a2.13 2.13 0 002.13-1.82l4.25-27.27a2.13 2.13 0 00-.5-1.73 2.08 2.08 0 00-1.63-.75z"
                    fill={props.color ?? colorRed}
                />
            </G>
            <Path
                d="M45.6 24.33a8 8 0 01-4-1.09L22.13 11.76a2.15 2.15 0 112.18-3.71l19.47 11.48a3.57 3.57 0 003.43.11L69.74 8.38a2.15 2.15 0 111.92 3.85L49.13 23.49a7.83 7.83 0 01-3.53.84z"
                fill={props.color ?? colorRed}
            />
        </Svg>
    )
}

function SvgTruck(props) {
    return (
        <Svg width={props.width ?? 55} height={props.height ?? 73} viewBox="0 0 73.22 31.56" {...props}>
            <Path
                d="M35.62 22.83A4.37 4.37 0 1040 27.2a4.37 4.37 0 00-4.38-4.37zm0 6.32a1.95 1.95 0 112-1.95 2 2 0 01-2 1.95zM24.86 22.83a4.37 4.37 0 104.37 4.37 4.37 4.37 0 00-4.37-4.37zm0 6.32a1.95 1.95 0 111.95-1.95 2 2 0 01-1.95 1.95zM63.26 22.83a4.37 4.37 0 104.36 4.37 4.37 4.37 0 00-4.36-4.37zm0 6.32a1.95 1.95 0 111.95-1.95 2 2 0 01-1.95 1.95z"
                fill={props.color ?? colorRed}
            />
            <Path
                d="M72 11.7a8.49 8.49 0 00-3.36-3.31 9.86 9.86 0 00-4.88-1.2h-7.35a9.2 9.2 0 00-1-2.68 8.49 8.49 0 00-3.36-3.31A9.9 9.9 0 0047.16 0H24.43a9.86 9.86 0 00-4.88 1.2 8.49 8.49 0 00-3.36 3.31A9.38 9.38 0 0015 9.29v20h3.18V9.32a5.7 5.7 0 01.8-3 5.54 5.54 0 012.24-2.1 6.83 6.83 0 013.22-.76h22.72a6.87 6.87 0 013.23.76 5.61 5.61 0 012.24 2.1 5.43 5.43 0 01.41.84 5.86 5.86 0 01.39 2.15v16.77h-11v3.18h14.18V10.68h7.16a6.9 6.9 0 013.23.76 5.67 5.67 0 012.24 2.1 5.74 5.74 0 01.79 3v12.72h3.19V16.48A9.38 9.38 0 0072 11.7z"
                fill={props.color ?? colorRed}
            />
            <Path
                fill={props.color ?? colorRed}
                d="M13.22 0h15.69v3.49H13.22zM7.84 0h3.49v3.49H7.84zM7.84 7.64h3.49v3.49H7.84zM2.63 0h3.49v3.49H2.63zM13.54 7.64h21.03v3.49H13.54zM0 14.63h3.49v3.49H0zM5.7 14.63h21.48v3.49H5.7z"
            />
        </Svg>
    )
}

function SvgMoneyUlgy(props) {
    return (
        <Svg width={80} height={80} viewBox="0 0 80 80" {...props}>
            <Defs>
                <Path
                    id="prefix__a"
                    d="M80 40c0 22.092-17.908 40-40 40C17.91 80 0 62.092 0 40S17.909 0 40 0c22.092 0 40 17.908 40 40"
                />
            </Defs>
            <G fill="none" fillRule="evenodd">
                <Path d="M0 0h80v80H0z" />
                <Mask id="prefix__b" fill="#fff">
                    <Use xlinkHref="#prefix__a" />
                </Mask>
                <Use fill="#76A340" xlinkHref="#prefix__a" />
                <Path
                    fill="#FFF"
                    d="M37.665 35.477c1 .554 2.542 1.13 4.627 1.726 2.088.597 3.804 1.193 5.15 1.79 1.348.596 2.498 1.492 3.454 2.685.957 1.193 1.435 2.77 1.435 4.73 0 2.5-.862 4.533-2.586 6.094-1.724 1.563-4.005 2.515-6.843 2.856v6.18h-4.998v-6.18a22.08 22.08 0 01-5.909-1.577c-1.884-.795-3.55-1.804-4.997-3.026l2.738-5.497c1.535 1.363 3.302 2.457 5.3 3.281 2 .825 3.824 1.236 5.475 1.236 1.42 0 2.528-.256 3.324-.767.797-.511 1.196-1.25 1.196-2.217 0-.766-.269-1.398-.804-1.896-.536-.497-1.217-.901-2.042-1.214-.826-.313-1.963-.667-3.412-1.066-2.085-.567-3.787-1.136-5.106-1.704-1.317-.568-2.455-1.435-3.41-2.6-.957-1.165-1.434-2.713-1.434-4.645 0-2.33.818-4.268 2.455-5.818 1.636-1.548 3.846-2.52 6.626-2.919v-5.796h4.998v5.753c1.738.2 3.403.57 4.997 1.109 1.593.54 3.012 1.221 4.259 2.045l-2.651 5.583a23.3 23.3 0 00-4.976-2.238c-1.753-.554-3.253-.83-4.497-.83-1.189 0-2.13.213-2.825.639-.695.426-1.043 1.051-1.043 1.875 0 1.052.5 1.854 1.499 2.408"
                    mask="url(#prefix__b)"
                />
            </G>
        </Svg>
    )
}

function SvgMenu(props) {
    return (
        <Svg viewBox="0 0 24 24" width={props.width ?? 48} height={props.height ?? 48} {...props}>
            <Path d="M0 0h24v24H0V0z" fill="none" />
            <Path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
        </Svg>
    )
}

const styles = StyleSheet.create({
    styleSmall: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleMin: {
        width: 16, height: 16, justifyContent: 'center', alignItems: 'center'
    }
})


export {
    SvgPick,
    SvgBulletPoints,
    SvgVehicle,
    SvgClock,
    SvgPeople,
    SvgPosition,
    SvgArrowDown,
    SvgSwap,
    SvgDuration,
    SvgCity,
    SvgCar,
    SvgCalendar,
    SvgPerson,
    SvgPhone,
    SvgMail,
    SvgNote,
    SvgMoney,
    SvgCheck,
    SvgCheckCircle,
    SvgDescription,
    SvgArrowBack,
    SvgCheckNormal,
    SvgTicket,
    SvgPlane,
    SvgCheckCircleBorder,
    SvgCheckSuccess,
    SvgSetting,
    SvgTitle,
    SvgNote2,
    SvgMenu,
    SvgDiChungXe,
    SvgDiChungTaxi,
    SvgChungXe,
    SvgXeChung,
    SvgTravel,
    SvgComboTravel,
    SvgExpress,
    SvgTruck,
}
