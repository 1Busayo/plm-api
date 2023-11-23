import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';


  // Load environment variables from .env file
  dotenv.config();



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1')
  const config =new DocumentBuilder()
                .setTitle('Personal Library Management System API')
                .setDescription('A RESTful API Personal Library Management System API')
                .setVersion('1.0')
                .addBearerAuth()
                .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT);
}
bootstrap();
