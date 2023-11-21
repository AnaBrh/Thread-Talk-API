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