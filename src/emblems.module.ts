import { Module } from '@nestjs/common';
import { EmblemsController } from './controllers/emblems.controller';
import { EmblemsService } from './services/emblems.service';
import { DatabaseModule } from './infra/db';
import { EmblemsRepository } from './repository/emblems.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emblems } from './entities/Emblems';
import { AccountsRepository } from './repository/accounts.repository';
import { Accounts } from './entities/Accounts';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Emblems, Accounts])],
  controllers: [EmblemsController],
  providers: [EmblemsService, EmblemsRepository, AccountsRepository],
})
export class EmblemsModule {}
