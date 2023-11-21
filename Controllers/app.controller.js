const { getAllTopics, getSingleArticle, getAllArticles } = require("../Models/app.model")
const devData = require("../db/data/development-data/index")
const jestsorted = require("jest-sorted")

exports.getTopics = (req, res, next) => {
    getAllTopics()
    .then((topics) => {
        res.status(200).send({ topics })
    })
    .catch(next)
}

exports.getArticles = (req, res, next) => {
    getAllArticles()
    .then((articles) => {
        res.status(200).send({ articles })
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
