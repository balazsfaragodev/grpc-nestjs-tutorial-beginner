import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ResizeModule } from './resize.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ResizeModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'resize',
        protoPath: join(__dirname, '../resize.proto'),
      },
    },
  );

  await app.listen();
}

bootstrap();
