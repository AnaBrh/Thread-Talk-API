const express = require("express")
const { getTopics, getArticleById} = require("./Controllers/app.controller")
const { handlePsqlErrs, handleCustomErrs, handleServerErrs } = require("./Errors/errors")

const app = express()
const endpoints = require("./endpoints.json")

app.use(express.json())

app.get("/api", (req, res) => {
    res.json(endpoints)
})

app.get("/api/topics", getTopics)

app.get("/api/articles/:article_id", getArticleById)

app.use(handlePsqlErrs)

app.use(handleCustomErrs)

app.use(handleServerErrs)

module.exports = app
