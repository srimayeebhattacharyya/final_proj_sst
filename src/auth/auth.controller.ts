import { Body, Controller, Get, HttpCode, Post, Req, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SignInDto } from './dtos/signin.dto';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/user/dtos/user.dto';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Serialize(UserDto)
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password, body.name);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  @Serialize(UserDto)
  async signin(@Body() body: SignInDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  whoami(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  @HttpCode(200)
  signout(@Req() req: Request) {
    req.session = null;
    return { message: 'Signed out successfully' };
  }
}
