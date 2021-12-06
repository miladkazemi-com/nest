import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityUserDto } from './dto/response/entity-user.dto';
import { UserPrismaRepo } from '../../repository/DB/userPrismaRepo';
import { GetUsersFilterDto } from './dto/request/get-users-filter.dto';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private usersRepo: UserPrismaRepo,
  ) {}

  //Create Or Register User
  async create(ValidData) {
    // See if email exist
    const user = await this.usersRepo.findOne({ email: ValidData.email });
    if (user) throw new BadRequestException('email already exist');

    //Bcrypt HashPassword
    ValidData.password = await AuthHelpers.hash(ValidData.password);

    return await this.usersRepo.create(ValidData);
  }

  //Find One User By Id
  async findOne(where: object): Promise<EntityUserDto> {
    return this.usersRepo.findOne(where);
  }

  //Find Users By Uniq Email
  async find(email: string) {
    return await this.usersRepo.find({ email });
  }

  //Find Users By Uniq Email
  async findAll(): Promise<EntityUserDto[]> {
    return await this.usersRepo.findAll();
  }

  //Find Users By Uniq Email
  async getUsersWithFilter(
    filterDto: GetUsersFilterDto,
  ): Promise<EntityUserDto[]> {
    const { role, search, take, orderBy, sort, skip } = filterDto;

    return await this.usersRepo.users({
      role,
      search,
      take,
      orderBy,
      sort,
      skip,
    });
  }

  //Update User
  async update(id: number, attrs: Partial<EntityUserDto>) {
    const user = await this.findOne({ id });

    if (!user) throw new NotFoundException('user not found');

    Object.assign(user, attrs);

    return await this.usersRepo.updateUser(id, user);
  }

  //Update User
  async changeUserRole(id: number, role: any) {
    const user = await this.getById(id);
    user.role = role;
    return await this.usersRepo.updateUser(id, role);
  }

  //Remove User By Id
  async remove(id: number): Promise<EntityUserDto> {
    const user = await this.findOne({ id });

    if (!user) throw new NotFoundException('user not found');

    return await this.usersRepo.deleteUser({ id });
  }

  //GetUserById
  async getById(id: number): Promise<EntityUserDto> {
    const found = await this.usersRepo.findOne({ id });
    if (!found) {
      throw new NotFoundException(`record not exist with ID : ${id}`);
    }
    return found;
  }
}
