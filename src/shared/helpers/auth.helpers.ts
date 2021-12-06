import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from "@nestjs/common";

const hash = (password) => {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt();
    //Bcrypt HashPassword
    try {
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log('salt', salt);
      console.log('hashedPassword', hashedPassword);

      resolve(hashedPassword);
    } catch (error) {
      reject(error);
    }
  });
};

const verify = (password, hash) => {
  return new Promise(async (resolve, reject) => {
   try {
     if (!(await bcrypt.compare(password, hash))) {
       throw new UnauthorizedException('Invalid password');
     }
     resolve(true)
   }catch (error){
     reject(error);
   }
  });
};

export const AuthHelpers = {
  hash,
  verify,
};
