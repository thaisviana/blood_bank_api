const csv = require('csv-string');
const fetch = require("node-fetch");


async function get_csv_content(path) {
    try {
        console.log(path)
        const res = await fetch(path, {
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8',
            }
        });
        if (res.status === 200) {
            const data = await res.text();
            return csv.parse(data)
        }
    } catch (err) {
        console.log(err)
    }
    return null
    }
module.exports = get_csv_content