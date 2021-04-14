import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {BaseEntity} from "../base.entity";
@Entity('Course_Management')
export class Course_Management extends BaseEntity{
 
    @Column({type:"int",nullable:false})
    course_id:number;
    @Column({type:"int",nullable:false})
    student_id:number;
}
