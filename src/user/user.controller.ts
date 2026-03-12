import { Controller, Get, Param, Patch, Query, Delete, NotFoundException, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  async findUser(@Param('id') id:string){
    console.log('handler is running');
    const user = await this.usersService.findOne(parseInt(id));
    if(!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email:string){
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id:string){
    return this.usersService.remove(parseInt(id))
  }

  @Patch('/:id')
  updateUser(@Param('id') id:string,@Body() body:UpdateUserDto){
    return this.usersService.update(parseInt(id),body)
  }
}
