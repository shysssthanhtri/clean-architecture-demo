import { type UserEntity } from '../entities/user.entity'

export abstract class UserRepository {
  abstract findUserById (id: UserEntity['id']): Promise<UserEntity | undefined>

  abstract createUser (user: UserEntity): Promise<UserEntity>
}

export class CreateUserInteractor {
  constructor (private readonly userRepository: UserRepository) {}

  async handle (user: UserEntity): Promise<UserEntity> {
    //  Business logic for validation
    if (await this.userRepository.findUserById(user.id) !== undefined) {
      throw new Error('Duplicated')
    }
    if (user.name === 'banned') {
      throw new Error('This user is banned')
    }
    //  Save to database
    return await this.userRepository.createUser(user)
  }
}
