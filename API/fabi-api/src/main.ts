import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'body-parser';

 


async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule,);
  app.use(json({ limit: '50mb'}));
  await app.listen(port);
}
bootstrap();
