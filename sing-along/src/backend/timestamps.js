export const to_milliseconds = (timestamp) =>{ // ex. "0:00:24.816" (quotes included)
    let stamp = timestamp.substring(1, timestamp.length-1);
    let hms = stamp.split('.')[0].split(':')
    let hr = hms[0]
    let min = hms[1]
    let sec = hms[2]

    let hour_in_ms = parseInt(hr) * 60 * 60 * 1000
    let min_in_ms = parseInt(min) * 60 * 1000
    let sec_in_ms = parseInt(sec) * 1000
    let ms = parseInt(stamp.split('.')[1])

    return (hour_in_ms + min_in_ms + sec_in_ms + ms)
}  

export const time_difference = (stamp1, stamp2) => {
    return Math.abs(to_milliseconds(stamp1) - to_milliseconds(stamp2));
}
    
export const millis_to_stamp = (total_ms) => {
    const hrs = total_ms // 3600000
    const mins = (total_ms % 3600000) // 60000
    const secs = (total_ms % 60000) // 1000
    const ms = total_ms % 1000;

    const _hrs = (hrs > 9) ? toString(hrs) : `0${hrs}`
    const _mins = (mins > 9) ? toString(mins) : `0${mins}`
    const _secs = (secs > 9) ? toString(secs) : `0${secs}`
    
    let _ms = ""
    if (ms <= 9) {
        _ms = `00${ms}`
    }
    else if (ms >= 10 && ms <= 99) {
        _ms = `0${ms}`
    }
    else {
        _ms = toString(ms)
    }

    return `\"${_hrs}:${_mins}:${_secs}.${_ms}\"`
}

export const alter_timestamp = (stamp, millis) => {
    return millis_to_stamp(to_milliseconds(stamp) + millis)
}