import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserPrismaRepo implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({});
  }

  /**
   * Find Array Of Users
   * @param condition
   */
  async find(condition: Object): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: condition,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async create(userCreateInput: Prisma.UserCreateInput): Promise<User | null> {
    return await this.prisma.user.create({
      data: userCreateInput,
    });
  }

  //GetUsers
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    search?: string;
    where?: Prisma.UserWhereInput | object;
    orderBy?: string;
    sort?: any;
    role?: any;
  }): Promise<User[]> {
    const { role, skip, take, cursor, search = '', orderBy = 'createdAt', sort } = params;

    return await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where: {
        role,
        name: { contains: search, mode: 'insensitive' },
      },
      orderBy: {
        [orderBy as string] : sort,
      },
    });
  }

  async updateUser(id: number, data: any): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(condition: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.delete({ where: condition });
  }
}
