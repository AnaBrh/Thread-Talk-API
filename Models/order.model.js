const db = require("../db/connection")
const format = require("pg-format")

exports.checkOrderExists = (order) => {
    return order === 'asc' || order === 'desc'
}