const csv = require('csv-string');
const fetch = require("node-fetch");

const get_csv_content = require('./get_csv_content')

function get_dtInfo(datestr) {
    return new Date((datestr + '').slice(0, 4), (datestr + '').slice(4, 6) - 1, (datestr + '').slice(6, 8))
}

async function get_dates(path) {
    const arr = await get_csv_content(path)
    if (arr) {
        const arr_size = arr.length
        first_date = get_dtInfo(arr[1][0])
        last_date = get_dtInfo(arr[arr_size - 1][0])
        return [first_date, last_date]
    }

    return [null, null]
}
module.exports = get_dates