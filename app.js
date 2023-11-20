const express = require("express")
const { getTopics, getArticleById} = require("./Controllers/app.controller")
const { handlePsqlErrs, handleCustomErrs, handleServerErrs, handle404 } = require("./Errors/errors")

const app = express()

app.use(express.json())

app.get("/api/topics", getTopics)

app.get("/api/articles/:article_id", getArticleById)

app.use(handlePsqlErrs)

app.use(handleCustomErrs)

app.use(handleServerErrs)

app.use(handle404)

module.exports = app
