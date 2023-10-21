import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.insert(createUserDto);
  }

  findOne(id: number) {
    return this.usersRepository.findBy({ id });
  }

  findAll() {
    return this.usersRepository.find();
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }
}
