const db = require("../db/connection")
const format = require("pg-format")

exports.checkTopicExists = (topic) => {
    return db
    .query(`SELECT * FROM topics WHERE topics.slug = $1;`, [topic])
    .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({
                status: 404,
                msg: 'Not found'
            })
        }
    })
}