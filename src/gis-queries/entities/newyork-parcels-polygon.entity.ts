import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Geometry } from 'geojson';

@Entity('newyork_parcels_polygon')
export  class NewyorkParcelsPloygonEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    parcel_city_id : number

    @Column()
    city_id : String

    @Column()
    address: String


    @Column()
    area: number

    @Column({type: String})
    geom : Geometry
}