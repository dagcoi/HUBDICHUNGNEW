
function formatHHMMDD(hour, minute, date) {
    return `${hour < 10 ? '0' + hour : hour}:${minute == 0 ? '00' : minute} ${date.format('DD/MM/YYYY')}`
}

function formatUTC(hour, minute, date) {
    return `${date.format('YYYY-MM-DD')}T${hour < 10 ? '0' + hour : hour}:${minute == 0 ? '00' : minute}:00.000`
}

export {
    formatHHMMDD,
    formatUTC,
}