import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Geometry } from 'geojson';

@Entity('newyork_points')
export  class GisCityEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    gid: number;

    @Column()
    region : String

    @Column()
    postcode : String

    @Column()
    address: String

    @Column({type: String})
    geom : Geometry
}