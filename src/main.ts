import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // rimuove le proprietà che non sono nei DTO
      forbidNonWhitelisted: true, // genera un errore se ci sono proprietà non definite nei DTO
      transform: true, // trasforma i payload JSON in oggetti basati sui DTO
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Gestione adozioni animali API')
    .setDescription('API per la gestione delle adozioni di animali')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
