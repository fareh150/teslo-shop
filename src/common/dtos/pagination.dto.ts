import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto
{
    @ApiProperty({
        default: 10,
        description: 'Number of items to return per page',
        required: false,
        type: Number,
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'Number of items to skip for pagination',
        required: false,
        type: Number,
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;
}