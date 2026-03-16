import { Controller, Get, Param, Patch, Query, Delete, NotFoundException, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  async findUser(@Param('id') id:string){
    console.log('handler is running');
    const user = await this.usersService.findOne(id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  findAllUsers(@Query('email') email:string){
    return this.usersService.find(email);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  removeUser(@Param('id') id:string){
    return this.usersService.remove(id)
  }

  @Patch('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  updateUser(@Param('id') id:string,@Body() body:UpdateUserDto){
    return this.usersService.update(id,body)
  }
}
