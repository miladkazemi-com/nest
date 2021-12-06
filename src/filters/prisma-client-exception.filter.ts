import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from "@nestjs/core";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message.replace(/\n/g, '');
    switch (exception.code){
      case 'P2002':
          response.status(HttpStatus.CONFLICT)
            .json({
              statusCode : HttpStatus.CONFLICT,
              message : "this Record  is already exist",
              error : message
            })
        break;
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
