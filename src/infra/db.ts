import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_HOST,
  PMA_PORT,
} from 'config';
import { Accounts } from 'src/entities/Accounts';
import { Emblems } from 'src/entities/Emblems';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: MYSQL_HOST,
      port: PMA_PORT,
      username: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      synchronize: false,
      entities: [Emblems, Accounts],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
