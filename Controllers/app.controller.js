const { getAllTopics } = require("../Models/app.model")
const devData = require("../db/data/development-data/index")

exports.getTopics = (req, res, next) => {
    getAllTopics()
    .then((topics) => {
        res.status(200).send({topics})
    })
    .catch(next)
}