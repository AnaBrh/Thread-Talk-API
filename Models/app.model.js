const db = require("../db/connection")
const format = require("pg-format")
const endpoints = require("../endpoints.json")
const jestsorted = require("jest-sorted")

exports.getAllTopics = () => {
    const queryStr = `SELECT * FROM topics `
    return db.query(queryStr)
    .then(({rows}) => {
        return rows
    })
}

exports.getAllArticles = () => {
    return db
    .query(`
    SELECT 
    articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
    COUNT (comments.article_id)
    AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`)
    .then(({ rows }) => {
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

exports.getCommsByArtcId = (article_id) => {
    return db
    .query(`
    SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [article_id]
    )
    .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: 'Not found'})
        }
        return rows
    })
}

exports.postCommentToArticle = (article_id, username, body) => {
    const queryStr = `
    INSERT INTO comments 
    (article_id, author, body) 
    VALUES ($1, $2, $3) 
    RETURNING *;
    `
    const queryVals = [article_id, username, body]
    return db.query(queryStr,queryVals)
    .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({
                status: 404, 
                msg: 'Not found'
            })
        }
        return rows[0]
    })
}

exports.updateArticleVotes = (article_id, inc_votes) => {
    if (isNaN(inc_votes)) {
        return Promise.reject({
            status:400,
            msg: 'Bad request'
        })
    }

    const queryStr = `
    UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;
    `
    const queryVals = [inc_votes, article_id]

    return db.query(queryStr, queryVals)
    .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({
                status: 404,
                msg: 'Not found'
            })
        }
        return rows[0]
    })
}