import { EntityUserDto } from '../response/entity-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from './create-user.dto';
import { Transform } from 'class-transformer';

export enum SortMode {
  asc = 'asc',
  desc = 'desc',
}

export class GetUsersFilterDto {
  // role? : EntityUserDto;
  @ApiProperty({
    description: `A list of user's roles => ${Object.values(UserRole).toString().toLowerCase()}`,
    example: 'USER',
  })
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    return value.toUpperCase();
  })
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    description: `text for search in name of user `,
    example: 'milad',
  })
  // @Transform(({ value }) => {return value.toLowerCase()})
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: `select user count`,
    example: '30',
  })
  // @IsString()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ required: false })
  @IsOptional()
  take?: number;

  @ApiProperty({
    description: `sort records by ?`,
    example: 'createdAt',
  })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiProperty({
    description: `skip from count records`,
    example: '0',
  })
  // @Transform(({ value }) => parseInt(value))
  @ApiProperty({ required: false })
  @IsOptional()
  // @IsString()
  skip?: number;

  @ApiProperty({
    description: `sort mode : asc or desc`,
    example: 'asc',
  })
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    return value.toLowerCase();
  })
  @IsEnum(SortMode)
  sort?: SortMode;


  // constructor(partial: Partial<GetUsersFilterDto>) {
  //   Object.assign(this,partial);
  // }
}
