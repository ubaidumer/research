import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Course} from "./course.entity";
import { Student } from 'src/student/student.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Course]),TypeOrmModule.forFeature([Student])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
