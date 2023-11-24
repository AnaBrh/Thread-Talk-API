const db = require("../db/connection");
const format = require("pg-format");
const endpoints = require("../endpoints.json");

exports.getAllTopics = () => {
	const queryStr = `SELECT * FROM topics `;
	return db.query(queryStr).then(({ rows }) => {
		return rows;
	});
};

exports.getAllArticles = (topic) => {
	let query = `
    SELECT 
	articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
	COUNT (comments.article_id) AS comment_count 
	FROM articles 
	LEFT JOIN comments ON articles.article_id = comments.article_id
`;

	const queryVals = [];
	if (topic) {
		query += ` WHERE articles.topic = $1`;
		queryVals.push(topic);
	}
	query += ` 
	GROUP BY articles.article_id 
    ORDER BY articles.created_at DESC`;

	return db.query(query, queryVals).then(({ rows }) => {
		return rows;
	});
};

exports.getSingleArticle = (article_id) => {
	return db
		.query(
			`SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.body, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count
			FROM articles 
        	LEFT JOIN comments ON articles.article_id = comments.article_id
        	WHERE articles.article_id = $1
        	GROUP BY articles.article_id;`,
			[article_id]
		)
		.then(({ rows }) => {
			if (!rows.length) {
				return Promise.reject({ status: 404, msg: "Not found" });
			}
			return rows[0];
		});
};

exports.getCommsByArtcId = (article_id) => {
	return db
		.query(
			`
    SELECT comment_id, votes, created_at, author, body, article_id 
	FROM comments 
	WHERE article_id = $1 
	ORDER BY created_at DESC;`,
			[article_id]
		)
		.then(({ rows }) => {
			if (!rows.length) {
				return Promise.reject({ status: 404, msg: "Not found" });
			}
			return rows;
		});
};

exports.postCommentToArticle = (article_id, username, body) => {
	const queryStr = `
    INSERT INTO comments 
    (article_id, author, body) 
    VALUES ($1, $2, $3) 
    RETURNING *;
    `;
	const queryVals = [article_id, username, body];
	return db.query(queryStr, queryVals).then(({ rows }) => {
		if (!rows.length) {
			return Promise.reject({
				status: 404,
				msg: "Not found",
			});
		}
		return rows[0];
	});
};

exports.updateArticleVotes = (article_id, inc_votes) => {
	if (isNaN(inc_votes)) {
		return Promise.reject({
			status: 400,
			msg: "Bad request",
		});
	}
	const queryStr = `
    UPDATE articles 
    SET votes = votes + $1 
    WHERE article_id = $2 
    RETURNING *;
    `;
	const queryVals = [inc_votes, article_id];
	return db.query(queryStr, queryVals).then(({ rows }) => {
		if (!rows.length) {
			return Promise.reject({
				status: 404,
				msg: "Not found",
			});
		}
		return rows[0];
	});
};

exports.deleteCommentById = (comment_id) => {
	const queryStr = `
    DELETE FROM comments 
    WHERE comment_id = $1 
    RETURNING *;
    `;
	const queryVals = [comment_id];
	return db.query(queryStr, queryVals).then(({ rows }) => {
		if (!rows.length) {
			return Promise.reject({
				status: 404,
				msg: "Not found",
			});
		}
		return rows[0];
	});
};

exports.getAllUsers = () => {
	const queryStr = `SELECT * FROM users`;
	return db.query(queryStr).then(({ rows }) => {
		return rows;
	});
};
