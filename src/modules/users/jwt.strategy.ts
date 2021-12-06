import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "./users.service";
import { UserDto } from "./dto/response/user.dto";
import { EntityUserDto } from "./dto/response/entity-user.dto";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: process.env.NODE_ENV === 'dev',
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserDto): Promise<any> /*EntityUserDto*/{
    const { email } = payload;
    const user = await this.usersService.findOne({ email } );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
