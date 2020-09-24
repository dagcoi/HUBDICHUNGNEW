import * as React from "react"
import { View, StyleSheet } from 'react-native'
import Svg, { Path } from "react-native-svg"

const colorDefault = '#77a300'

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
        <View style={props.style ?? styles.styleSmall}>
            <Svg
                width={24}
                height={24}
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


const styles = StyleSheet.create({
    styleSmall: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
}
