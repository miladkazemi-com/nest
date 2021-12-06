import {
  IsEmail,
  IsString,
  IsOptional,
  Matches,
  IsNotEmpty,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, UserRole } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserDto {
  @ApiProperty({
    description: `User Email Address`,
    example: 'miladkazemi.ir@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({
    description: `User Password`,
    example: 'password_text',
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is too weak',
  // })
  password?: string;

  @ApiProperty({
    description: `User FullName`,
    example: 'Milad Kazemi',
  })
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ required: false })
  name?: string;

  // @IsOptional()
  // @ApiProperty({ required: false })
  // @IsEnum(UserRole)
  // role?: string;
}
