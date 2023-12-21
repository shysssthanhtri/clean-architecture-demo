import { type UserEntity } from '../entities/user.entity'
import { type UserRepository } from '../repository/user.repository'

export class UserService {
  constructor (private readonly userRepository: UserRepository) {}

  async createUser (user: UserEntity): Promise<UserEntity> {
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
