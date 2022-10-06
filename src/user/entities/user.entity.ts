import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
export  class UserEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName : String

    @Column()
    lastName : String

    @Column()
    @Unique(['email'])
    email: String

    @Column({type: String})
    password : String

    @Column({default: 1})
    status : number //1=> isActive 2=> not active
}