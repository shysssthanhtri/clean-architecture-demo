import express, { type Request, type Response } from 'express'

import { UserEntity } from '../entities/user.entity'
import { type CreateUserInteractor } from '../interactor/create-user.interactor'

export class UserController {
  constructor (private readonly createUserInteractor: CreateUserInteractor) {}

  createUser = (req: Request, res: Response): void => {
    const user = new UserEntity(req.body.id as number, req.body.name as string)
    this.createUserInteractor
      .handle(user)
      .then((user) => {
        res.json(user)
      })
      .catch((err) => {
        res.status(500).json({
          message: (err as Error).message
        })
      })
  }

  register (app: express.Express, prefix: string): void {
    const router = express.Router()
    router.post('/', this.createUser)

    app.use(prefix, router)
  }
}
