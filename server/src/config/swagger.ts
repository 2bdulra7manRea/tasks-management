import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerBuild(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Tasks Management Backend')
    .setDescription('The Tasks Management APIs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
}
