const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")
const request = require("supertest")
const endpoints = require("../endpoints.json")

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
});

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

// describe('ANY /notapath', () => {
//     test('404: responds with an error message if path does not exist', () => {
//         return request(app)
//         .get("/notapath")
//         .expect(404)
//         .then(({ body }) => {
//             expect(body.msg).toBe('Path not found.')
//         })
//     });
// });