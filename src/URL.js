export const URL_DEBUG1 = "http://hubdev.dichungtaxi.com/"
export const URL_API = (process.env.NODE_ENV === 'development') ? "https://dev.taxiairport.vn/api.php/" : "https://taxiairport.vn/api.php/"

// export const URL_API_PORTAL = (process.env.NODE_ENV === 'development') ? "https://dev.portal.dichung.vn/api/" : "https://dev.portal.dichung.vn/api/"

export const URL_API_PORTAL = (process.env.NODE_ENV === 'development') ? "https://portal.dichung.vn/api/" : "https://portal.dichung.vn/api/"


export const URL_REALASE = "http://dichung.vn/"

export const SOURCE = (process.env.NODE_ENV === 'development') ? "http://hubdev.dichungtaxi.com" : "http://hubdev.dichungtaxi.com" //"https://dichung.vn" 
