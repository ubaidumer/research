import { Module } from '@nestjs/common';
import { CourseManagementService } from './course-management.service';
import { CourseManagementController } from './course-management.controller';
import { Course_Management } from './course_management.entity';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Student } from 'src/student/student.entity';
import { Course } from 'src/course/course.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Course_Management]),
  TypeOrmModule.forFeature([Course]),
  TypeOrmModule.forFeature([Student])],
  providers: [CourseManagementService],
  controllers: [CourseManagementController]
})
export class CourseManagementModule {}
