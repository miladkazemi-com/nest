import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UserPrismaRepo } from '../../repository/DB/userPrismaRepo';
import { PrismaService } from '../../prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthModule } from './auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from "./guards/roles.guard";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./guards/auth.guard";

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    PrismaService,
    UserPrismaRepo,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
    JwtStrategy,
    RolesGuard,
    JwtAuthGuard

  ],
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  exports : [JwtStrategy,PassportModule]
})
export class UsersModule {}
