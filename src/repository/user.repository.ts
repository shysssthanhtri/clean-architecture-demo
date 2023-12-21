import { type UserEntity } from '../entities/user.entity'

export class UserRepository {
  private readonly users: UserEntity[] = []

  async createUser (user: UserEntity): Promise<UserEntity> {
    this.users.push(user)
    return user
  }

  async findUserById (id: UserEntity['id']): Promise<UserEntity | undefined> {
    return this.users.find(user => user.id === id)
  }
}
