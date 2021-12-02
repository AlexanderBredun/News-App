export function ZeroCount(message = "") {
    this.name = "ZeroCount";
    this.message = message;
}
ZeroCount.prototype = new Error();

export function timeAgo (time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}

function pluralize (time, label) {
    if (time === 1) {
        return time + label + ' ago'
    }
    return time + label + 's ago'
}

export function paginationSlice(arr, page, perPage) {
    return arr.slice(0, (page*perPage))
}

const itemsPerPage = 9;

export function datesDiff(d1, d2) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const diffTime = Math.abs(date2 - date1);
    const diffHours = (diffTime / (60*60*1000)).toFixed('1')
    return Number(diffHours)
}


export {itemsPerPage}