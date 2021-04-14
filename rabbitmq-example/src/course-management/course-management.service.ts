import { Injectable } from '@nestjs/common';
import { Course_Management } from './course_management.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/student/student.entity';
import { Course } from 'src/course/course.entity';
@Injectable()
export class CourseManagementService {

    constructor(@InjectRepository(Course_Management)
    private CourseManage : Repository<Course_Management>,
    @InjectRepository(Student)
private studentRep: Repository<Student> ,
@InjectRepository(Course)
private courseRep: Repository<Course>
    ){}
async create(data:Course_Management){
    let sid=data.student_id;
    let cid=data.course_id;
    const student = await this.studentRep.findOne({id:sid});
    const course  = await this.courseRep.findOne({id:cid});


    if(!student||!course){
        return "enter valid course and student id";
    }

    const sLimit= await this.CourseManage.find({student_id:sid});
    if(sLimit.length>=6){
        return "a student can be registered to maximuim 6 courses";
    }
    const cLimit = await this.CourseManage.find({course_id:cid});
    if(cLimit.length>=course.studentlimit){
        return "course: "+course.coursename+" can have maximuim limit of "+course.studentlimit +" ";
    }
    const hasboth= await this.CourseManage.findOne({course_id:cid,student_id:sid});
    if(hasboth){
        return "student already in registered to the course";
    }
    const newReg=await this.CourseManage.create(data);
    await this.CourseManage.save(newReg);
    return newReg;
}
async findwithid(id:string){
    let i=parseInt(id);
    return await this.CourseManage.find({student_id:i});
}




}
