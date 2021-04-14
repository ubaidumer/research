import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { Student } from 'src/student/student.entity';
import { View } from 'typeorm/schema-builder/view/View';
import { Course} from './course.entity';
import { CourseService } from './course.service';
@Controller('course')
export class CourseController {

    constructor (private CourseService: CourseService){}
    @Get()
    ShowAllCourse(){
        return this.CourseService.showAll();
    }
    @Post()
    Create(@Body() data:Course){
        return this.CourseService.create(data);
    }
    @Get(':id')
    Findbyid(@Param() id:String ){
        return this.CourseService.findone(id);
    }
    @Get('/info/:data')
    Findbydata(@Param('data') data:string ){
        return this.CourseService.finddata(data);
    }



    @Put(':id')
    updateCourse(@Param('id') id:string, @Body() data: Partial<Course>){
        return this.CourseService.update(id,data);
    }


    @Delete(':id')
    destroyCourse(@Param('id') id:string){
        return this.CourseService.destroy(id);
    }
    @Patch(':id')
    addStudent(@Param('id') id:string,sid:string){
        return this.CourseService.addstudent(sid,id);
    }
}
