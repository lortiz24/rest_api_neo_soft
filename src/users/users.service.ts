import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput } from 'src/auth/dto/inputs/signup.inputs';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async create(signupInput: SignupInput): Promise<User> {

    try {
      const newUser = await this.usersRepository.create(signupInput);
      return newUser
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Algo salio mal');
    }
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
