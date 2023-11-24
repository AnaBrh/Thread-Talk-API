const express = require("express");
const {
	getTopics,
	getArticles,
	getArticleById,
	getCommentsByArticleId,
	postComment,
	updateArticleById,
	deleteComment,
	getUsers,
} = require("./Controllers/app.controller");
const {
	handlePsqlErrs,
	handleCustomErrs,
	handleServerErrs,
} = require("./Errors/errors");
const apiRouter = require("./Routers/api-router")

const app = express();

app.use(express.json());

app.use('/api', apiRouter)

//need to add comments endpoint
app.delete("/api/comments/:comment_id", deleteComment);

app.use(handlePsqlErrs);

app.use(handleCustomErrs);

app.use(handleServerErrs);

app.all("*", (req, res) => {
	res.status(404).send({ msg: "Not Found" });
});

module.exports = app;
