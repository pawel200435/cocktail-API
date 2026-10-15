import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class QueryCocktailDto {

    @IsInt()
    @Min(1)
    @Type(() => Number)
    @IsOptional()
    @ApiPropertyOptional({description: "Page number for pagination", example: 1})
    page?: number = 1;

    @IsInt()
    @Min(1)
    @Type(() => Number)
    @IsOptional()
    @Max(100)
    @ApiPropertyOptional({description: "Limit of items per page for pagination", example: 10})
    limit?: number = 10;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({description: "Search term for filtering cocktails by name or category", example: "Margarita"})
    search?: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    @ApiPropertyOptional({description: "Filter by cocktail by ingredient id"})
    ingredientId?: number;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({description: "Filter by cocktail by ingredient name", example: "Lime"})
    ingredientName?: string;

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    @ApiPropertyOptional({description: "Filter by alcoholic or non-alcoholic cocktails", example: true})
    isAlcoholic?: boolean;
}