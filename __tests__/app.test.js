const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")
const request = require("supertest")

beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    return db.end()
})

describe('GET /api/topics', () => {
    test('200: returns an array of all topics', () => {
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
    // test('400: returns message "Bad request." when path is invalid', () => {
    //     return request(app)
    //     .get("/api/topics/banana")
    //     .expect(404)
    //     .then(({body}) => {
    //         console.log(body, "<--body")
    //         expect(body.msg).toBe('Not Found')
    //     })
    // });
});

describe('GET /api/articles/:article_id', () => {
    test('200: accepts a article_id query which responds with all articles with that id', () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({body}) => {
            const { article } = body
            article.forEach((article) => {
                expect(article.article_id).toBe(1)
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String)
                })
            })
        })
    });
});