import { User , Prisma } from '@prisma/client';
import { UpdateUserDto } from '../../../modules/users/dto/request/update-user.dto';

export interface UserRepositoryInterface {
  /**
   * Find Users By Condition [where]
   * @example {id : 5}
   * @param condition
   */
  find(condition: Object): Promise<User[]>;


  /**
   * Find Users By Condition [where]
   * @example {id : 5}
   * @param condition
   */
  findOne(condition: Object): Promise<User>;

  /**
   * Create Or SignUp User
   * @param userCreateInput
   */
  create(userCreateInput): Promise<User>;


  /**
   * All Users Or All Users With Filters
   * params : {skip?: number, take?: number , cursor?: where? , orderBy?:}
   * @param params
   */
  users(params): Promise<User[]>;

  /**
   * Update User By Id
   * @param id
   * @param data
   */
  updateUser(id: number, data: UpdateUserDto): Promise<User>;

  /**
   * Delete User By Unique Id
   * @param condition
   */
  deleteUser(condition): Promise<User>;
}
