import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;


    if (user) {
      // request.currentUser = await this.usersService.findOne({ id });
      request.currentUser = request.user;
    }
    // console.log(request.currentUser);
    return handler.handle();
  }
}
