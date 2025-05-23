import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'admin', password: '123456' },
    { id: 2, username: 'user', password: 'qwerty' },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }
}
