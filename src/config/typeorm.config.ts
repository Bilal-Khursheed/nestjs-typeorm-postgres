import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfigs : TypeOrmModuleOptions ={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'nestjs',
    entities: [__dirname+ '/../**/entities/*.entity{.ts,.js}'],
    // entities: [UserEntity],
    synchronize: false,
  }