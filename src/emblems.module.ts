import { Module } from '@nestjs/common';
import { EmblemsController } from './emblems.controller';
import { EmblemsService } from './emblems.service';
import { DatabaseModule } from './infra/db';
import { EmblemsRepository } from './emblems.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emblems } from './entities/Emblems';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Emblems])],
  controllers: [EmblemsController],
  providers: [EmblemsService, EmblemsRepository],
})
export class EmblemsModule {}
