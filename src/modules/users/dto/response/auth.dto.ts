import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { INVALID_EMAIL } from "../../../../shared/constants/strings";
import { UserDto } from "./user.dto";
import { Expose } from "class-transformer";

export class AuthResponseDTO {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name : string

  @Expose()
  role : string

  @Expose()
  accessToken: string;
}

export class RegisterUserDTO {
  email: string;
  name: string;
  password: string;
}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
