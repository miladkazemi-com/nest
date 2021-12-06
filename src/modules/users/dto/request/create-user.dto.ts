import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class CreateUserDto {
  @ApiProperty({
    description: `User Email Address`,
    example: "miladkazemi.ir@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({
    description: `User Password`,
    example: "password_text",
  })
  @IsString()
  @MaxLength(100)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is too weak',
  // })
  password: string;

  @ApiProperty({
    description: `User FullName`,
    example: "Milad Kazemi",
  })
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ required: false })
  name?: string;


}

export enum UserRole {
  USER = "USER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

export class RoleUpdateDto{
  @ApiProperty({
    description: `A list of user's roles => [admin,user,seller]`,
    example: "user",
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

//username
// @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))