import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerBuild } from './config/swagger';
import { TransformInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerBuild(app);
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.NODE_SERVER_PORT);
}
bootstrap();
