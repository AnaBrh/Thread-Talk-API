const {
	getAllTopics,
	getAllArticles,
	getSingleArticle,
	getCommsByArtcId,
	postCommentToArticle,
	updateArticleVotes,
	deleteCommentById,
	getAllUsers,
} = require("../Models/app.model");
const { checkTopicExists } = require("../Models/topic.model");

const devData = require("../db/data/development-data/index");

exports.getTopics = (req, res, next) => {
	getAllTopics()
		.then((topics) => {
			res.status(200).send({ topics });
		})
		.catch(next);
};

exports.getArticles = (req, res, next) => {
	const { topic } = req.query;
	const topicPromises = [getAllArticles(topic)];

	if (topic) {
		topicPromises.push(checkTopicExists(topic));
	}
	Promise.all(topicPromises)
		.then((resolvedPromises) => {
			const articles = resolvedPromises[0];
			res.status(200).send({ articles });
		})
		.catch(next);
};

exports.getArticleById = (req, res, next) => {
	const { article_id } = req.params;
	getSingleArticle(article_id)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
	const { article_id } = req.params;
	getCommsByArtcId(article_id)
		.then((comments) => {
			res.status(200).send({ comments });
		})
		.catch(next);
};

exports.postComment = (req, res, next) => {
	const { article_id } = req.params;
	const { username, body } = req.body;

	postCommentToArticle(article_id, username, body)
		.then((comment) => {
			res.status(201).send({ comment });
		})
		.catch(next);
};
exports.updateArticleById = (req, res, next) => {
	const { article_id } = req.params;
	const { inc_votes } = req.body;

	updateArticleVotes(article_id, inc_votes)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch(next);
};

exports.deleteComment = (req, res, next) => {
	const { comment_id } = req.params;

	deleteCommentById(comment_id)
		.then(() => {
			res.status(204).send();
		})
		.catch(next);
};

exports.getUsers = (req, res, next) => {
	getAllUsers()
		.then((users) => {
			res.status(200).send({ users });
		})
		.catch(next);
};
