

function countWeekend(date1, date2) {
    var d1 = new Date(date1),
        d2 = new Date(date2),
        result = {
            saturday: 0,
            sunday: 0,
        },
        day = 1;
    while (d1 <= d2) {
        var day = d1.getDay();
        if (day === 6) {
            result.saturday++
        }
        if (day === 0) {
            result.sunday++
        }
        day = day + 1;
        d1.setDate(d1.getDate() + 1);
    }
    // this.setState({ countSaturday: result.saturday, countSunday: result.sunday, countDay: day })
    return result;
}

function getDateTimeAlive() {
    var date = new Date().getDate();
    if (date < 10) {
        date = '0' + date
    }
    var month = new Date().getMonth() + 1;
    if (month < 10) {
        month = '0' + month
    }
    var result = {
        spesentTime: null,
        spesentDay: null,
        hoursAlive: null,
        minutesAlive: null,
    },
        year = new Date().getFullYear(),
        hours = new Date().getHours(),
        min = new Date().getMinutes(),
        sec = new Date().getSeconds(),
        spesentDay = date + '-' + month + '-' + year;
    result.spesentDay = spesentDay
    result.spesentTime = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
    result.hoursAlive = hours
    result.minutesAlive = min
    console.log(result.spesentTime)
    return result;
}

function formatDate(string) {
    var date = new Date(string);
    var strDate = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return strDate;
}

function handleChange(num) {
    let number = num.replace(new RegExp(/,/gi), '')
    let money = Number(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return money;
};

function formatCurrency(currency) {
    console.log(currency)
    // return '123'
    return currency
        .toString()
        .split('')
        .reverse()
        .join('')
        .match(/.{1,3}/g)
        .map((i) => i.split('').reverse().join(''))
        .reverse()
        .join(',')
}
function replacePoint(currency) {
    return Number(currency.replace(new RegExp(/,/gi), ''))
}

export {
    countWeekend,
    getDateTimeAlive,
    formatDate,
    handleChange,
    formatCurrency,
    replacePoint,
}