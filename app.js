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

const app = express();
const endpoints = require("./endpoints.json");

app.use(express.json());

app.get("/api", (req, res) => {
	res.json(endpoints);
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", updateArticleById);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

app.use(handlePsqlErrs);

app.use(handleCustomErrs);

app.use(handleServerErrs);

app.all("*", (req, res) => {
	res.status(404).send({ msg: "Not Found" });
});

module.exports = app;
