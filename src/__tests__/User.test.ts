import { app } from '../app'
import request from 'supertest'
import createConnection from '../database/index'

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })
    it("shoud be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Example"
        })
        expect(response.status).toBe(201)
    })

    it("shoud not be able to create a  user with exists email", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Example"
        })
        expect(response.status).toBe(400)
    })
})