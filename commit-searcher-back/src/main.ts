import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Enable CORS only for front-ends in localhost with port 4200 or 3000, and only get method
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: ['GET'],
  });

  //API versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Commit Searcher API')
    .setDescription(
      'This API is intended to search commits for a specific repository',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('commits')
    .addTag('health-check')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
