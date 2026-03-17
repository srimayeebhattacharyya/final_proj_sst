import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SignInDto } from './dtos/signin.dto';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/user/dtos/user.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Serialize(AuthResponseDto)
  async signup(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body.email, body.password, body.name);
    const accessToken = this.authService.getAccessToken(user);

    return { accessToken, user };
  }

  @Post('/signin')
  @Serialize(AuthResponseDto)
  async signin(@Body() body: SignInDto) {
    const user = await this.authService.signin(body.email, body.password);
    const accessToken = this.authService.getAccessToken(user);

    return { accessToken, user };
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  whoami(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  @HttpCode(200)
  signout() {
    return { message: 'Signed out successfully' };
  }
}
