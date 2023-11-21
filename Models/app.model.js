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

exports.getSingleArticle = (article_id) => {
        return db
        .query( `SELECT * FROM articles WHERE article_id = $1;`, [article_id])
        .then(({rows}) => {
            if (!rows.length) {
                return Promise.reject({ status: 404, msg: 'Not found'})
            }
            return rows
        })
}