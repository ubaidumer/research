import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";
import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {BaseEntity} from "../base.entity";
import { Course } from "../course/course.entity";


import {v4 as uuid} from 'uuid';
import {diskStorage} from "multer"
var fs = require('fs');


@Entity('Student')
export class Student extends BaseEntity{
 
    @Column({type:"varchar",length:25,nullable:false})
    firstname:String;
    @Column({type:"varchar",length:25,nullable:false})
    lastname:String;
    @Column({type:"varchar",length:50,nullable:false,unique:true})
    username:String;
    @Column({type:"varchar",length:35,nullable:false,unique:true})
    email:String;
    @Column({type:"varchar",length:35,nullable:false})
    password:String;
    @Column({type:"text",nullable:true,default:null})
    address:String;
    @Column({type:"varchar",length:25,nullable:false,unique:true})
    phonenumber:String;
    @ManyToMany(type=> Course, course=>course.student) 
    course: Course[];
}
export const multerConfig={
    dest:'uploads'
  }
  function uuidRandom(file){
    const result = `${uuid()}${extname(file.originalname)}`
    return result;
  }
  export const multerOptions = {
   
    fileFilter:(req:any, file:any, cb:any)=>{
     // var maxSize = 2 * 1000 * 1000;
    if(file.mimetype.match(/\/(jpg|jpeg|png|gif$)$/)) 
    {
      cb(null,true)
    }
    else{
      cb(new HttpException(`Unsupport file type ${extname(file.originalname)}`,HttpStatus.BAD_REQUEST),false)
    }
    },
    
    limits: { fileSize: 1000000 },
    storage:diskStorage({
    destination:(req:any, file:any, cb:any)=>{
      const uploadPath = multerConfig.dest
      if(!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath)
      }
      cb(null,uploadPath)
    },
    filename:(req:any,file:any,cb:any)=>{
      cb(null,uuidRandom(file));
    }
    })
    
  }