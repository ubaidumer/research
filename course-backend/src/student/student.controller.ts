import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { multerOptions,Student } from './student.entity';
import { StudentService } from './student.service';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { EventPattern } from '@nestjs/microservices';
@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService){}
    @Get()
    showAllStudents(){
        return this.studentService.showAll();
    }
    @Get('/info/:data')
    getbyinfo(@Param('data') data:string){
        return this.studentService.getbyinfo(data);
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('image'))
    uploadfile(@UploadedFiles() file){
        console.log(file);
    }
    @Post()
    createStudent(@Body() data:Student){
        return this.studentService.create(data)
    }

    @Get(':id')
    readStudent(@Param('id') id:string){
        return this.studentService.read(id);
    }

    @Put(':id')
    updateStudent(@Param('id') id:string, @Body() data: Partial<Student>){
        return this.studentService.update(id,data);
    }

    @Delete(':id')
    destroyStudent(@Param('id') id:string){
        return this.studentService.destroy(id);
    }
    @EventPattern('hello')
    async hello(data:string){
        console.log(data);
    }
}
