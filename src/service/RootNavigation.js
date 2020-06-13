import * as React from 'react';

export const isMountedRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function getCurrentRoute() {
  let rootState = navigationRef.current.getRootState();
  let route = rootState.routes[rootState.index];

  while (route.state) {
    route = route.state.routes[route.state.index];
  }
  return route;
}