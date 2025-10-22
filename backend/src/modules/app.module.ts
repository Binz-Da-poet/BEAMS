import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomersModule } from '../resources/customers/customers.module';
import { HeavyFabricMasterModule } from '../resources/heavy-fabric-master/heavy-fabric-master.module';
import { JacketPatternMasterModule } from '../resources/jacket-pattern-master/jacket-pattern-master.module';
import { BodyLiningMasterModule } from '../resources/body-lining-master/body-lining-master.module';
import { SleeveLiningMasterModule } from '../resources/sleeve-lining-master/sleeve-lining-master.module';
import { HeavyFabricButtonMasterModule } from '../resources/heavy-fabric-button-master/heavy-fabric-button-master.module';
import { OptionMasterModule } from '../resources/option-master/option-master.module';
import { PlansModule } from '../resources/plans/plans.module';
import { ItemTypesModule } from '../resources/item-types/item-types.module';
import { AppController } from '../app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CustomersModule, HeavyFabricMasterModule, JacketPatternMasterModule, BodyLiningMasterModule, SleeveLiningMasterModule, HeavyFabricButtonMasterModule, OptionMasterModule, PlansModule, ItemTypesModule],
  controllers: [AppController],
})
export class AppModule {}
