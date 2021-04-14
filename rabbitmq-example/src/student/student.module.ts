import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student} from './student.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ClientsModule, Transport } from "@nestjs/microservices";
@Module({
  imports: [TypeOrmModule.forFeature([Student]),  MulterModule.register({
    dest: './uploads',
  }),    ClientsModule.register([
    {
      name: 'STUDENT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://tubitbxo:6u-fHLwNu2g0_NSMgXGkscaCtUKA1_ds@fish.rmq.cloudamqp.com/tubitbxo'],
        queue: 'primary_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
