import { NestFactory } from '@nestjs/core';
import { EmblemsModule } from './emblems.module';
import { API_PORT } from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(EmblemsModule);

  const config = new DocumentBuilder()
    .setTitle('back_cidadealtarp')
    .setDescription(
      'Lista emblemas, resgata emblemas para um usuário, lista emblemas resgatados pelo usuários',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);
  await app.listen(API_PORT);
}
bootstrap();
