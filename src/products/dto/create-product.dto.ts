import { ApiProperty } from "@nestjs/swagger";
import {
    IsArray,
    IsIn,
    IsInt,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MinLength
} from "class-validator";

export class CreateProductDto
{
    @ApiProperty({
        description: 'The title of the product',
        example: 'T-Shirt',
        minLength: 3,
        maxLength: 100,
        required: true
    })
    @IsString()
    @MinLength(3)
    title: string;

    @ApiProperty({
        description: 'Product price',
        example: 29.99,
        required: false,
        minimum: 0
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description: 'Product description',
        example: 'A comfortable cotton t-shirt',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Product slug (unique identifier for URLs)',
        example: 't-shirt',
        required: false
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        description: 'Stock available',
        example: 100,
        required: false,
        minimum: 0
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        description: 'Available sizes',
        example: ['S', 'M', 'L', 'XL'],
        isArray: true
    })
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty({
        description: 'Gender category',
        example: 'men',
        enum: ['men', 'women', 'kid', 'unisex']
    })
    @IsIn(['men','women','kid','unisex'])
    gender: string;

    @ApiProperty({
        description: 'Product tags',
        example: ['summer', 'sale'],
        isArray: true,
        required: false
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        description: 'Product images URLs',
        example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        isArray: true,
        required: false
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
}
