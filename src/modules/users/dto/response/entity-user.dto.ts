import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional, Matches,
  MaxLength,
  Min,
  MinLength
} from "class-validator";
import { Exclude, Transform } from 'class-transformer';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class EntityUserDto {
  // @ApiProperty({ required: false })
  // @IsNumber()
  // id? : number;

  @ApiProperty({
    description: `User Email Address`,
    example: 'miladkazemi.ir@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({
    description: `User FullName`,
    example: 'Milad Kazemi',
  })
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({
    description: `User Password`,
    example: 'password_text',
  })
  @ApiProperty({ required: false })
  @Exclude()
  @MaxLength(100)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is too weak',
  // })
  password: string;

  @ApiProperty({
    description: `A list of user's roles => [ADMIN,USER]`,
    example: 'ADMIN',
  })
  @Transform(({ value }) => value.name)
  @IsOptional()
  @IsEnum(UserRole)
  role?: string;
  // (typeof UserRole)[keyof typeof UserRole]

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}



