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
      this.usersService.updateLastLogin(user._id);
      
      return user;
    }
    return null;
  }

  async signUp(dto: CreateUserDto) {
    try {
      const user = await this.usersService.create(dto);
      return {
        accessToken: await this.jwtService.signAsync({ sub: user._id }),
        user
      };
    } catch (err) {
      throw new ForbiddenException(`Sign up error: ${err}`);
    }
  }

  async signIn(user: any): Promise<any> {
    return {
      accessToken: await this.jwtService.signAsync({ sub: user._id }),
      user
    };
  }
}