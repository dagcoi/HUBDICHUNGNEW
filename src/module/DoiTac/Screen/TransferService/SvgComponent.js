import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" fill="#77a300" />
      <Path fill="none" d="M0 0h24v24H0z" />
    </Svg>
  )
}

function SvgBulletPoints(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      aria-hidden="true"
      color="#333"
      {...props}
    >
      <Path d="M19 13H5v-2h14v2z" fill={props.color} />
      <Path fill="none" d="M0 0h24v24H0z" />
    </Svg>
  )
}

function SvgVehicle(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <Path d="M12 4H5C3.34 4 2 5.34 2 7v8c0 1.66 1.34 3 3 3l-1 1v1h1l2-2.03L9 18v-5H4V5.98L13 6v2h2V7c0-1.66-1.34-3-3-3zM5 14c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm15.57-4.34c-.14-.4-.52-.66-.97-.66h-7.19c-.46 0-.83.26-.98.66L10 13.77l.01 5.51c0 .38.31.72.69.72h.62c.38 0 .68-.38.68-.76V18h8v1.24c0 .38.31.76.69.76h.61c.38 0 .69-.34.69-.72l.01-1.37v-4.14l-1.43-4.11zm-8.16.34h7.19l1.03 3h-9.25l1.03-3zM12 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill={props.color} />
      <Path fill="none" d="M0 0h24v24H0z" />
    </Svg>
  )
}

export { SvgComponent, SvgBulletPoints, SvgVehicle }
