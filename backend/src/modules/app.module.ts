import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomersModule } from '../resources/customers/customers.module';
import { AppController } from '../app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CustomersModule],
  controllers: [AppController],
})
export class AppModule {}
