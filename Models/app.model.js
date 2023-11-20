const db = require("../db/connection")

exports.getAllTopics = () => {
    const queryStr = `SELECT * FROM topics`
    return db.query(queryStr)
    .then(({rows}) => {
        return rows
    })
}

exports.getSingleArticle = (article_id) => {
    if (article_id) {
        return db
        .query( `SELECT * FROM articles WHERE article_id = $1;`, [article_id])
        .then(({rows}) => {
            return rows
        })
    }
    return db
    .query(`SELECT * FROM articles;`)
    .then(({rows}) => {
        return rows
    })
}