import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
   /* const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3001);*/

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://tubitbxo:6u-fHLwNu2g0_NSMgXGkscaCtUKA1_ds@fish.rmq.cloudamqp.com/tubitbxo'],
        queue: 'primary_queue',
        queueOptions: {
          durable: false
        },
      },
    });

    app.listen(()=>{
      console.log("Microservices is listening");
    }); 
}
bootstrap();
