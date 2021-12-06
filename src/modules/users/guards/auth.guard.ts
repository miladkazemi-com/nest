import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  role: string[];

  constructor(private reflector: Reflector) {
    super(reflector);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.role = this.reflector.get<string[]>('role', context.getHandler());
    console.log(this.role);
    return super.canActivate(context);
  }

  handleRequest(err: Error, user: User): any {
    console.log(user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (!this.role) {
      return user;
    }

    // const hasPermission = this.roles.includes(user.role);
    // if (!hasPermission) {
    //   throw new ForbiddenException();
    // }

    return user;
  }
}
