import express from 'express'

import { UserController } from './controller/user.controller'
import { UserRepository } from './repository/user.repository'
import { UserService } from './service/user.service'

const main = async (): Promise<void> => {
  const app = express()

  const userRepository = new UserRepository()
  const userService = new UserService(userRepository)
  const userController = new UserController(userService)
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
