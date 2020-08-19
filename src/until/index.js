

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

export {
    countWeekend,
    getDateTimeAlive
}