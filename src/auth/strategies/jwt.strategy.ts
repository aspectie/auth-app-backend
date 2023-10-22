import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ sub }: {sub: string}) {
    const user = await this.usersService.findById(sub);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (user.isBlocked) {
      throw new ServiceUnavailableException('The user is blocked');
    }

    return {
      id: user._id,
    };
  }
}