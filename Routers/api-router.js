const apiRouter = require("express").Router()
const { getTopics } = require("../Controllers/app.controller");
const endpoints = require("../endpoints.json");
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const userRouter = require("./user-router");

apiRouter.get('/', (req, res) => {
    res.json(endpoints)
})

apiRouter.get('/topics', getTopics)

apiRouter.use('/articles', articlesRouter)

apiRouter.use('/users', userRouter)

// apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter;