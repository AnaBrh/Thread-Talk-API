const db = require("../db/connection")
const format = require("pg-format")
const endpoints = require("../endpoints.json")

exports.getAllTopics = () => {
    const queryStr = `SELECT * FROM topics `
    return db.query(queryStr)
    .then(({rows}) => {
        return rows
    })
}