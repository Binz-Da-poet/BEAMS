import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe, patchNestJsSwagger } from '@anatine/zod-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    }),
    new ZodValidationPipe(),
  );

  // Enable zod + swagger integration
  patchNestJsSwagger();

  const config = new DocumentBuilder().setTitle('BEAMS API').setDescription('BEAMS backend API with Swagger + Zod/DTO validation').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 3000;
  await app.listen(port);
}

bootstrap();
