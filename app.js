const express = require("express")
const { getTopics } = require("./Controllers/app.controller")
const { handlePsqlErrs, handleCustomErrs, handleServerErrs, handle404 } = require("./Errors/errors")
const app = express()
const endpoints = require("./endpoints.json")

app.use(express.json())

app.get("/api", (req, res) => {
    res.json(endpoints)
})

app.get("/api/topics", getTopics)

app.all("*", handle404)

app.use(handlePsqlErrs)

app.use(handle404)

app.use(handleCustomErrs)

app.use(handleServerErrs)


module.exports = app
