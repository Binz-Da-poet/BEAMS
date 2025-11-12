import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../resources/auth/auth.module';
import { HeavyFabricMasterModule } from '../resources/heavy-fabric-master/heavy-fabric-master.module';
import { BodyLiningMasterModule } from '../resources/body-lining-master/body-lining-master.module';
import { SleeveLiningMasterModule } from '../resources/sleeve-lining-master/sleeve-lining-master.module';
import { HeavyFabricButtonMasterModule } from '../resources/heavy-fabric-button-master/heavy-fabric-button-master.module';
import { OptionMasterModule } from '../resources/option-master/option-master.module';
import { PatternMastersModule } from '../resources/pattern-masters';
import { SuppliersModule } from '../resources/suppliers';
import { MCodeModule } from '../resources/m-code';
import { StoresModule } from '../resources/stores';
import { StaffModule } from '../resources/staff';
import { AppController } from '../app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, HeavyFabricMasterModule, BodyLiningMasterModule, SleeveLiningMasterModule, HeavyFabricButtonMasterModule, OptionMasterModule, PatternMastersModule, SuppliersModule, MCodeModule, StoresModule, StaffModule],
  controllers: [AppController],
})
export class AppModule {}
