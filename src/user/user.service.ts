import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { CreateUserDto, LoginUserDto } from "./dto";
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtServices: JwtService
        ) { }
    async signUp(createUserDto: CreateUserDto) {
        const password: any = createUserDto.password;
        const hashPassword = await bcrypt.hash(password, 10);
        return await this.userRepository.save({ ...createUserDto, password: hashPassword });

    }
    async login(loginData: LoginUserDto): Promise<UserEntity | undefined | {data:any, accessToken?: string, msg?:string}> {
        const { email, password } = loginData
        const isUserExist = await this.userRepository.findOneBy({ email: Equal(email) });
        
        if (!isUserExist) {
            return {
                msg: 'Provided credentials are not correct.',
                data: {},
            }
        }
        const isPasswordMatch = await bcrypt.compare(<string>password, <string>isUserExist.password);
        
        if(!isPasswordMatch){
            return {
                msg: 'Provided credentials are not correct.',
                data: {},
            }
        }
        return {
            msg: 'User is loggedIn Successfully.',
            data: isUserExist,
            accessToken: this.jwtServices.sign({id: isUserExist.id,email: isUserExist.email })
        };

    }
    async findAllUsers() {
        return await this.userRepository.find({});
    }
}