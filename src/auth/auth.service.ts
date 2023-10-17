import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, _password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === _password) {
      return user;
    }
    return null;
  }

  async signUp(dto: CreateUserDto) {
    try {
      const user = await this.usersService.create(dto);
      return {
        access_token: await this.jwtService.signAsync({ sub: user._id }),
        user
      };
    } catch (err) {
      throw new ForbiddenException(`Sign up error: ${err}`);
    }
  }

  async signIn(user: any): Promise<any> {
    return {
      access_token: await this.jwtService.signAsync({ sub: user._id }),
      user
    };
  }
}