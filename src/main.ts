import { NestFactory } from '@nestjs/core';
import { EmblemsModule } from './emblems.module';
import { API_PORT } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(EmblemsModule);
  await app.listen(API_PORT);
}
bootstrap();
