import {
  CanActivate,
  ExecutionContext, ForbiddenException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "../users.service";
import { map } from "rxjs/operators";
import { UserRole } from "../dto/request/create-user.dto";

@Injectable()
export class RolesGuard implements CanActivate {
  roles: string[];

  constructor(private reflector: Reflector,private userService : UsersService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.roles = this.reflector.get<any>('roles', context.getHandler());

    if (!this.roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest()
    let user : User = request.user;


    const hasPermission = this.roles.includes(user.role);
    if (!hasPermission) {
      throw new ForbiddenException("Sorry! You Don't Have Permissions for this");
    }

    return true;

    // return super.canActivate(context);
  }

  handleRequest(err: Error, user: User): any {
    console.log(user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    // if (!this.UserRole) {
    //   return user;
    // }

    // const hasPermission = this.roles.includes(user.role);
    // if (!hasPermission) {
    //   throw new ForbiddenException();
    // }

    return user;
  }
}

