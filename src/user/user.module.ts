import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
        secret: process.env.JWT_SECRET ||'bilalk',
        signOptions: { expiresIn: '60m' },
    }),],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule { }