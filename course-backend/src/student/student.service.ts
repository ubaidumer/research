import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student} from './student.entity';
var validator=require('validator');
@Injectable()
export class StudentService {
constructor(@InjectRepository(Student)
private studentRep: Repository<Student> )
{}

async showAll(){
   return await this.studentRep.find();

}
async create(data: Student){
    if(validator.isAlpha(data.firstname)&&validator.isAlpha(data.lastname)){
        if(validator.isAlphanumeric(data.username)){
            if(validator.isEmail(data.email)){
                if(validator.isLength(data.password,{min:8})){
                   
                        if(validator.isLength(data.phonenumber,{min:11,max:12})&&validator.isNumeric(data.phonenumber)){

                            const s= await this.studentRep.findOne({username:data.username});
                            if(s){
                                return "Write a Unique username";
                            }
                            const st= await this.studentRep.findOne({phonenumber:data.phonenumber});
                            if(st){
                                return "Phonenumber already registered";
                            }
                            const stu= await this.studentRep.findOne({email:data.email});
                            if(stu){
                                return "Email already registered";
                            }
                            const student = await this.studentRep.create(data);
                            await this.studentRep.save(student);
                            return student;
                        }else{
                            return "phonenumber must be Numeric and atleast 11 digits";
                        }
                   
                }else{
                    return "password too small";
                }
            }else{
                return "Invalid Email"
            }
        }else{
            return "username needs to be AlphaNumeric without spaces"
        }
    }else{
        return "firstname and lastname need to be Alphabetic"
    }
}

async read(id:string) {
    return await this.studentRep.findOne({where: {id} });

}
async update(id:string, data:Partial<Student>){
  if(data.username){
    const s= await this.studentRep.findOne({username:data.username});
    if(s){
        return "Write a Unique username";
    }}
    if(data.phonenumber){
    const st= await this.studentRep.findOne({phonenumber:data.phonenumber});
    if(st){
        return "Phonenumber already registered";
    }}
    if(data.email){
        if(validator.isEmail(data.email)){
    const stu= await this.studentRep.findOne({email:data.email});
    if(stu){
        return "Email already registered";
    }
    }else{
        return "Invalid EMail"
    }
}

    
    await this.studentRep.update( id ,data);
    return await this.studentRep.findOne(id);

}

async destroy(id:string){
    await this.studentRep.delete(id);
    return { deleted: true};
}
async getbyinfo(data:string){
    if(validator.isEmail(data)){
        const s= await this.studentRep.findOne({email:data});
        return s;        
    }
    const s= await this.studentRep.findOne({username:data});
    return s;
}

}
