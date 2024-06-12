import { Module } from '@nestjs/common';
import { EmblemsController } from './emblems.controller';
import { EmblemsService } from './emblems.service';
import { DatabaseModule } from './infra/db';
import { EmblemsRepository } from './emblems.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emblems } from './entities/Emblems';
import { AccountsRepository } from './accounts.repository';
import { Accounts } from './entities/Accounts';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Emblems, Accounts])],
  controllers: [EmblemsController],
  providers: [EmblemsService, EmblemsRepository, AccountsRepository],
})
export class EmblemsModule {}
