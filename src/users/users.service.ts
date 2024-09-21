import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      username: 'user1',
      password: 'soStrongPassword',
    },
    {
      username: 'user2',
      password: 'strongerPassword',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
