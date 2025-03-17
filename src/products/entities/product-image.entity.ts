import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductImage
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;
}