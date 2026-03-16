import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { promisify } from 'util';
import { scrypt as scryptCallback, randomBytes } from 'crypto';

const scrypt = promisify(scryptCallback);

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(email: string, password: string, name: string, admin: boolean) {
  const user = this.usersRepository.create({
    email,
    password,
    name,
    admin,
  });

  return this.usersRepository.save(user);
}
  findOne(id: string) {
    if(!id){
      return null;
    }
    return this.usersRepository.findOneBy({id});
  }
  find(email:string){
    return this.usersRepository.find({where:{email}});
  }
  //Bad method: update(id:number,newEmail:string,newPassword:string){}
   async update(id:string,attrs:Partial<User>){
    const user=await this.findOne(id);
    if(!user){
      throw new NotFoundException('User not found');
    }

    if (attrs.email && attrs.email !== user.email) {
      const existingUsers = await this.find(attrs.email);
      if (existingUsers.length) {
        throw new BadRequestException('email in use');
      }
    }

    if (attrs.password) {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(attrs.password, salt, 32)) as Buffer;
      attrs.password = `${salt}.${hash.toString('hex')}`;
    }

    Object.assign(user,attrs);
    return this.usersRepository.save(user);
  }
  async remove(id:string){
    const user=await this.findOne(id)
    if(!user){
      throw new NotFoundException('user not found')
    }
    return this.usersRepository.remove(user);
  }
}
