import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {

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
  @ApiProperty()
  password: string;

}


