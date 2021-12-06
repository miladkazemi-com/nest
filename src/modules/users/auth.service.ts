import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //Login User
  async signUp(ValidData) {
    try {
      // Create a new user and save it
      return await this.usersService.create(ValidData);
    } catch (error) {
      console.log(error);
    }
  }

  //Register User
  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException(`No user found for email: ${email}`);

    if (user && (await AuthHelpers.verify(password, user.password))) {
      const payload: JwtPayload = { email: user.email, role: user.role };

      const accessToken: string = await this.jwtService.signAsync(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please Check You Login Credentials');
    }
  }
}
