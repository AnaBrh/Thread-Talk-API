const { getArticles, getArticleById, getCommentsByArticleId, postComment, updateArticleById } = require("../Controllers/app.controller")

const articlesRouter = require("express").Router()

articlesRouter.get("/", getArticles)

articlesRouter.get("/:article_id", getArticleById)

articlesRouter.get("/:article_id/comments", getCommentsByArticleId)

articlesRouter.post("/:article_id/comments", postComment)

articlesRouter.patch("/:article_id", updateArticleById)

module.exports = articlesRouter