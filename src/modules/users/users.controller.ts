import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RoleUpdateDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/request/login-user.dto';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UserDto } from './dto/response/user.dto';
import { EntityUserDto } from './dto/response/entity-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { GetUsersFilterDto } from './dto/request/get-users-filter.dto';
import { AuthResponseDTO } from './dto/response/auth.dto';
import { JwtAuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { hasRoles } from './decorators/user-roles.decorator';

@ApiTags('SPAD API')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Serialize(UserDto)
  @ApiTags('AUTH')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ type: AuthResponseDTO })
  @Post('/signin')
  async signIn(@Body() body: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.authService.signIn(body.email, body.password);
    return user;
  }

  @Post('/signup')
  @ApiTags('AUTH')
  @ApiCreatedResponse({
    status: 201,
    description: 'The User has been successfully Registered.',
    type: EntityUserDto,
  })
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body);
    return user;
  }

  @Get('/whoami')
  @ApiTags('AUTH')
  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('accessToken')
  // @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: EntityUserDto) {
    return user;
  }

  @Get('/:id')
  @ApiOkResponse({ type: EntityUserDto })
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne({ id: parseInt(id) });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('accessToken')
  @ApiOkResponse({ type: EntityUserDto, isArray: true })
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Delete('/:id')
  @Serialize(UserDto)
  @Serialize(UserDto)
  @hasRoles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('accessToken')
  @ApiBadRequestResponse()
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  @Serialize(UserDto)
  @hasRoles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('accessToken')
  @ApiCreatedResponse({
    status: 201,
    description: 'The User has been successfully Updated.',
    type: EntityUserDto,
  })
  @ApiBadRequestResponse()
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Serialize(UserDto)
  @Patch('/change-role/:id')
  @ApiCreatedResponse({
    status: 201,
    description: 'The User Role has been successfully Updated.',
    type: EntityUserDto,
  })
  @ApiBadRequestResponse()
  changeUserRole(@Param('id') id: string, @Body() role: RoleUpdateDto) {
    return this.usersService.changeUserRole(parseInt(id), role);
  }

  @Serialize(UserDto)
  @Get('/users/get-users-filter')
  @ApiOkResponse({ type: EntityUserDto, isArray: true })
  getUsersFilter(@Query() filterDto: GetUsersFilterDto) {
    return this.usersService.getUsersWithFilter(filterDto);
  }
}
