import { Request, response, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup'
import { AppErrors } from "../errors/appErrors";

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            throw new AppErrors(error)
        }

        const userRepository = getCustomRepository(UsersRepository)
        const userAlreadyExists = await userRepository.findOne({
            name,
            email
        })
        if (userAlreadyExists) {
            throw new AppErrors("User already exists")
        }
        const user = userRepository.create({ name, email })
        await userRepository.save(user)

        return res.status(201).json(user)
    }
}

export { UserController }