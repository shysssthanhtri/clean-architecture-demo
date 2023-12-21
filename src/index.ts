import express from 'express'

import { UserController } from './controller/user.controller'
import { CreateUserInteractor } from './interactor/create-user.interactor'
import { UserRepositoryImpl } from './repository/user.repository'

const main = async (): Promise<void> => {
  const app = express()

  const userRepository = new UserRepositoryImpl()
  const createUserInteractor = new CreateUserInteractor(userRepository)
  const userController = new UserController(createUserInteractor)
  userController.register(app, '/users')

  app.listen(3000, () => {
    console.log('Listening...')
  })
}

main()
  .catch(err => {
    console.error(err)
    throw err
  })
