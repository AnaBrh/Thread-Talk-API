const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")
const request = require("supertest")
const endpoints = require("../endpoints.json")
const jestsorted = require("jest-sorted")

beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    return db.end()
})

describe('GET /api', () => {
    test('200: responds with an object describing all the available endpoints', () => {
        return request(app)
        .get("/api")
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.body).toEqual(endpoints)
        })
    });
});

describe('GET /notAPath', () => {
    test('404: responds with an error message if path does not exist', () => {
        return request(app)
        .get("/api/notapath")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Not Found')
            })
        });
    });

describe('ANY /invalidPath', () => {
    test('404: responds with an error message if path is invalid', () => {
        return request(app)
        .get("/invalidpath")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Not Found')
            })
        });
    });

describe('GET /api/topics', () => {
    test('200: returns an array of all topics and their properties', () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
            const { topics } = body
            expect(topics).toHaveLength(3)

            topics.forEach((topic) => {
                expect(topic).toMatchObject({
                    description: expect.any(String),
                    slug: expect.any(String)
                })
            })
        })
    });
});

describe('GET /api/articles', () => {
    test('200: returns an array of all articles and their properties', () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles).toHaveLength(13)

                articles.forEach((article) => {
                    expect(article).toMatchObject({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(String)
                    })
                })
            })
    });
    test('200: returns an array of sorted by date articles in descending order', () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles).toHaveLength(13)
                expect(articles).toBeSortedBy("created_at", { descending: true })
            });
    });
});

describe('GET /api/articles/:article_id', () => {
    test('200: accepts a article_id query which responds with all articles with that id', () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
            const { article } = body
            article.forEach((article) => {
                expect(article.article_id).toBe(1)

                expect(article).toMatchObject({
                    article_id: 1,
                    title: 'Living in the shadow of a great man',
                    topic: 'mitch',
                    author: 'butter_bridge',
                    body: 'I find this existence challenging',
                    created_at: '2020-07-09T20:11:00.000Z',
                    votes: 100,
                    article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
                })
            })
        })
    });
    test('400: sends an error message when given an invalid id', () => {
        return request(app)
        .get("/api/articles/invalidId")
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad request')
        })
    });
    test('404: sends an error message when given a non-existent id ', () => {
        return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not found')
        })
    });
});

describe('GET /api/articles/:article_id/comments', () => {
    test('200: accepts an article_id query and returns an array of comments matching the id', () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
            const { comments } = body
            expect(comments).toHaveLength(11)

            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: expect.any(Number)
                })
            })
        })
    });
    test('200: correctly sorts the comments by the most recent first', () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
            const { comments } = body
            expect(comments).toHaveLength(11)
            expect(comments).toBeSortedBy("created_at", { descending: true })
        });
    });
    test('400: sends an error message when given an invalid article id', () => {
        return request(app)
        .get("/api/articles/invalidId/comments")
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad request')
        })
    });
    test('404: sends an error message when given a non-existent article id ', () => {
        return request(app)
        .get("/api/articles/9999/comments")
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not found')
        })
    });
});

describe('POST /api/articles/:article_id/comments', () => {
    test('201: correctly adds a comment to an article and responds with the newly added comment', () => {
        const newComment = {
            body: 'Hello, my name is lurker!',
            username: 'lurker',
        }
        return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
                const { comment } = body
                    expect(comment).toMatchObject({
                        comment_id: 19,
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: expect.any(Number)
                    })
                })
    });
    test('201: ignores unnecessary properties on the request body', () => {
        const newComment = {
            body: 'Hello, my name is lurker!',
            username: 'lurker',
            anotherProperty: 'Ignore me!',
        };
        return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
            const { comment } = body
            expect(comment.unnecessaryProperty).toBeUndefined()
        })
    });
    test('400: Bad request, invalid article id', () => {
        const newComment = {
            body: 'Hello, my name is lurker!',
            username: 'lurker',
        };
        return request(app)
        .post("/api/articles/notanumber/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
        });
    });
    test('404: Not found, article id does not exist', () => {
        const newComment = {
            body: 'Hello, my name is lurker!',
            username: 'lurker',
        };
        return request(app)
        .post("/api/articles/9999/comments")
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not found');
        });
    });
    test('400: Bad request, incomplete body', () => {
        const incompleteComment = { 
            username: 'lurker'
        };
        return request(app)
            .post('/api/articles/1/comments')
            .send(incompleteComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
    });
    test('404: Not found, provided username does not exist', () => {
        const notAUserComment = {
            username: 'notauser',
            body: 'My comment will not be posted :(',
        };
        return request(app)
            .post('/api/articles/1/comments')
            .send(notAUserComment)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not found');
            });
        });
});

describe('DELETE /api/comments/:comment_id', () => {
    test('204: successfully deletes a comment by comment_id', () => {
        return request(app)
        .delete('/api/comments/1')
        .expect(204);
    });
    test('400: invalid comment_id', () => {
        return request(app)
        .delete('/api/comments/invalidId')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad request');
            });
        });
    test('404: comment_id does not exist', () => {
        return request(app)
        .delete('/api/comments/9999')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not found');
        });
    });
});
