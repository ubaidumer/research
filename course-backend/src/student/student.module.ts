import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student} from './student.entity';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [TypeOrmModule.forFeature([Student]),  MulterModule.register({
    dest: './uploads',
  })],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
