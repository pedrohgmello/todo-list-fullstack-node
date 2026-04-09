import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ZodValidationPipe());
  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });

  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  }));

  const config = new DocumentBuilder()
  .setTitle('Task Manager API')
  .setDescription('API para gerenciamento de tarefas')
  .setVersion('1.0')
  .addBearerAuth(
    {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira seu token JWT',
        in: 'header',
      },
      'access-token',
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
