import { IsEmail,IsNotEmpty, Min } from 'class-validator'

export class CreateUserDto {

    @IsNotEmpty()
    firstName : String

    @IsNotEmpty()
    lastName: String

    @IsEmail()
    @IsNotEmpty()
    email: String

    @IsNotEmpty()
    password: String
 }

export class LoginUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: String

    @IsNotEmpty()
    password: String
}