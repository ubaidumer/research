import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {BaseEntity} from "../base.entity";
import {Student} from "../student/student.entity";
@Entity('Course')
export class Course extends BaseEntity{
 
    @Column({type:"varchar",length:25,nullable:false,unique:true})
    coursename:string;
    @Column({type:"int",nullable:false})
    studentlimit:number;
    @ManyToMany(type=> Student, student=> student)
    student: Student[]
}
