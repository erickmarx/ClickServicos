import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.useGlobalPipes(
    new ValidationPipe(),
  );

  await app.listen(process.env.PORT || 3000, async () => {
    console.dir(`Server started listening: ${process.env.PORT || 3000}`);
  });
}
bootstrap();
