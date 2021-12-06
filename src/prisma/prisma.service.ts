import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy{
  constructor() {
    super({ log: ['info'] });
  }

  async onModuleInit(): Promise<any> {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }


  async onModuleDestroy() {
    await this.$disconnect();
  }
}
