import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Course_Management } from './course_management.entity';
import {CourseManagementService} from "./course-management.service"
@Controller('course_management')
export class CourseManagementController {
    constructor(private CourseM : CourseManagementService){}
    @Post()
    NewReg(@Body() data:Course_Management){
        return this.CourseM.create(data);
    }
    @Get(':id')
    findwithid(@Param('id') id:string){
        return this.CourseM.findwithid(id);
    }
}
