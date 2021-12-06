import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from './users.module';

@Module({
  providers: [],
  imports: [
    // forwardRef(() => UsersModule)
  ],
})
export class AuthModule {}
