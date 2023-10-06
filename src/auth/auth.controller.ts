import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: CreateUserDto })
  @Post('sign-in')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Public()
  @Post('sign-up')
  register(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }
}