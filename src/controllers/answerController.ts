import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppErrors } from "../errors/appErrors";
import { SurveysUserRepository } from "../repositories/SurveysUsersSurveysUserRepository";

class AnswerController {
    async execute(req: Request, res: Response) {
        const { value } = req.params
        const { u } = req.query

        const surveysUsersRepository = getCustomRepository(SurveysUserRepository)

        const surveyUser = await surveysUsersRepository.findOne({ id: String(u) })

        if (!surveyUser) {
            throw new AppErrors("Survey User does not exists")
        }

        surveyUser.value = Number(value)

        await surveysUsersRepository.save(surveyUser)

        res.json(surveyUser)
    }
}

export { AnswerController }