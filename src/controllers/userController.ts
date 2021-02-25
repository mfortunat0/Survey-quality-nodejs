import { Request, response, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body

        const userRepository = getCustomRepository(UsersRepository)
        const userAlreadyExists = await userRepository.findOne({
            name,
            email
        })
        if (userAlreadyExists) {
            return res.status(400).json({
                error: "user already exists"
            })
        }
        const user = userRepository.create({ name, email })
        await userRepository.save(user)

        return res.status(201).json(user)
    }
}

export { UserController }