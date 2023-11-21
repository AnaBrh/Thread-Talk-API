const { getAllTopics, getSingleArticle } = require("../Models/app.model")
const devData = require("../db/data/development-data/index")

exports.getTopics = (req, res, next) => {
    getAllTopics()
    .then((topics) => {
        res.status(200).send({topics})
    })
    .catch(next)
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    getSingleArticle(article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch(next)
}