import { Controller,Post,Body,Get,Param,Patch,Query, Delete,NotFoundException,
UseInterceptors, ClassSerializerInterceptor,UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from '../auth/auth.service';
import { Session } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService:UsersService,
              private authService:AuthService
  ){}
  @Get('/whoamI')
  @UseGuards(AuthGuard)
  whoamI(@CurrentUser() user:User){
    return user;
  }
  @Post('/signout')
  signout(@Session()session:any){
    session.userId=null;  
  }

  @Post('/signup')
async createUser(@Body() body: CreateUserDto, @Session() session: any) {
  const user = await this.authService.signup(
    body.email,
    body.password,
    body.name
  );

  session.userId = user.id;

  return user;
}

  @Post('/signin')
  async signin(@Body() body:CreateUserDto, @Session() session:any){
    const user=await this.authService.signin(body.email,body.password);
    session.userId=user.id;
    return user;
  }
  
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