import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'products'
})
export class Product
{
    @ApiProperty({
        example: 'd3f4e5f6-1234-5678-9101-112131415161',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt',
        description: 'Product title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    title: string;

    @ApiProperty({
        example: 19.99,
        description: 'Product price',
        default: 0
    })
    @Column('float', {
        default : 0
    })
    price: number;

    @ApiProperty({
        example: 'A comfortable cotton t-shirt',
        description: 'Product description',
        required: false
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't-shirt_comfortable',
        description: 'Product slug',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['S', 'M', 'L'],
        description: 'Product sizes',
        default: []
    })
    @Column('text', {
        array: true
    })
    sizes: string[];

    @ApiProperty({
        example: 'unisex',
        description: 'Product gender'
    })
    @Column('text')
    gender: string;

    @ApiProperty({
        example: ['t-shirt', 'cotton'],
        description: 'Product tags',
        default: []
    })
    @Column('text',{
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty({
        type: () => ProductImage,
        isArray: true,
        description: 'Product images',
        default: []
    })
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {
            cascade: true,
            eager: true
        }
    )
    images?: ProductImage[]

    @ManyToOne(
        () => User,
        (user) => user.product,
        {
            eager: true,
        }
    )
    user: User

    @BeforeInsert()
    checkSlugInsert()
    {
        if (!this.slug)
        {
            this.slug = this.title
        }

        this.slug = this.slug
        .trim()
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }

    @BeforeUpdate()
    checkSlugUpdate()
    {
        this.slug = this.slug
        .trim()
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
}
