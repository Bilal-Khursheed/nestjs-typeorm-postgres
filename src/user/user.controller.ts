import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller('user')

export class UserController{
    constructor(private userService: UserService){}

    @Post('register')
    signUp(@Body() dto: CreateUserDto){

        return this.userService.signUp(dto)

    }

    @Post('login')
    login(@Body() dto: LoginUserDto ){
        console.log('Calling LOgin api====>', dto);
        
        return this.userService.login(dto)
    }

    @Get('all')
    findAll(){
        return this.userService.findAllUsers()
    }

}