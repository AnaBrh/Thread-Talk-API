const db = require("../db/connection")
const format = require("pg-format")

exports.checkColumnExists = (column) => {const validColumns = ['article_id', 'author', 'title', 'topic', 'created_at', 'votes', 'article_img_url', 'comment_count']
return validColumns.includes(column)
}