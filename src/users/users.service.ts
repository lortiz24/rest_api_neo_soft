import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  findOne(id: string): Promise<User> {
    throw new Error('Not implemented');
  }

  update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    throw new Error('not implemented')
  }

  block(id: string): Promise<User> {
    throw new Error('not implemented')
  }
}
