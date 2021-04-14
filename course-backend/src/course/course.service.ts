import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/student.entity';
import { Repository } from 'typeorm';
import { Course} from './course.entity';
var validator= require('validator');
@Injectable()
export class CourseService {

constructor (@InjectRepository(Course)
private courseRep: Repository<Course>,
@InjectRepository(Student)
private studentRep: Repository<Student>
){}

async showAll(){

    return await this.courseRep.find();
}

async create(data : Course){

    if(validator.isEmpty(data.coursename)){
        return"coursename cant be empty";
    }
    data.coursename=data.coursename.toLowerCase();
    if(validator.isAlpha(data.coursename)&&validator.isNumeric(data.studentlimit)){
       
       let c= await this.courseRep.findOne({coursename:data.coursename});
        if(c){
            return "coursename already exist";
        }
        if(data.studentlimit<1){
            return "limit must be greater than 0";
        } 
    const course= await this.courseRep.create(data)
    await this.courseRep.save(course);
    return course;
    }else{
        return "course must contain Alphabets and StudentLimit must be Numeric";
    }
}
async findone(id:String){
    let c= await this.courseRep.findOne({where:id});
    if(!c){
        return "Not Found";
    }
    return await this.courseRep.findOne({where:id});
}
async finddata(data:string){
    let c= await this.courseRep.findOne({coursename:data});
    if(!c){
        return "Not Found";
    }
    return c;
}
async update(id:string, data:Partial<Course>){
    if(data.coursename){
        if(validator.isEmpty(data.coursename)&&validator.isAlpha(data.coursename)){
            return "invalid Coursename";
        }else if(!validator.isEmpty(data.coursename)){
        let c= await this.courseRep.findOne({coursename:data.coursename.toLowerCase()});
        if(c){
            return "coursename already exist";
        }
    }
    }
    if(data.studentlimit){
        if(data.studentlimit<1){
            return "limit must be greater than 0";
        }
        if(!validator.isNumeric(data.studentlimit)){
            return "limit must be numeric";
        }
    }
    data.coursename=data.coursename.toLowerCase();
    await this.courseRep.update( id ,data);
    return await this.courseRep.findOne(id);

}
async destroy(id:string){
    let c= await this.courseRep.findOne(id);
    if(c){
    await this.courseRep.delete(id);
    return { deleted: true};
    }else{
        return "Not Found";
    }
}
async addstudent(sid:string,id:string){
    let s= await this.studentRep.findOne({where:{id:sid}});
    await this.courseRep.update(id,s);
    return await this.courseRep.findOne(id);
}
}
