import { app } from '../app'
import request from 'supertest'
import createConnection from '../database/index'
import { getConnection } from 'typeorm'

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.dropDatabase();
        await connection.close()
    })

    it("shoud be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "example",
            description: "description"
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it("shoud be able to get all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "example2",
            description: "description2"
        })

        const response = await request(app).get("/surveys")
        expect(response.body.length).toBe(2)
    })
})