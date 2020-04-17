const {format} = require('timeago.js')

exports.timeago = (timestamp)=>{
    return format(timestamp)
}