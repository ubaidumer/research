import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
export const config :TypeOrmModuleOptions ={

    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'YOYOdongone555',
    database: 'Course_Management',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
};