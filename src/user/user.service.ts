import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.findOne({where: {id: id}});
  }

  async getByUserEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({where: {email: email}});
  }

  async getByUserEmailCheck(email: string): Promise<Object | boolean> {
    const user = await this.userRepository.findOne({where: {email: email} });
    if (!!user) {
      const userObj = {id: user.id, email: user.email} 
      return userObj;
    } else return false;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = bcrypt.hashSync(createUserDto.password, 8);
    return this.userRepository.save(user);
  }

  async deleteUserById(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return 'Removido com sucesso';
  }
}
