const express = require("express")
const { getTopics } = require("./Controllers/app.controller")
const { handlePsqlErrs, handleCustomErrs, handleServerErrs } = require("./Errors/errors")
const app = express()

app.use(express.json())

app.get("/api/topics", getTopics)

app.use(handlePsqlErrs)

app.use(handleCustomErrs)

app.use(handleServerErrs)

module.exports = app
