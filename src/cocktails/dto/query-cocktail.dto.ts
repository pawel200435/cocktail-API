import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CocktailCategory } from '../../generated/prisma/browser';
import { Transform } from 'class-transformer';
import { SortDirection } from '../../ingredients/dto/query-ingredient.dto';

export enum CocktailSortBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
}

export class QueryCocktailDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
  })
  page?: number = 1;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  @Max(100)
  @ApiPropertyOptional({
    description: 'Limit of items per page for pagination',
    example: 10,
  })
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter by cocktail name (case-insensitive)',
    example: 'Mojito',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter by cocktail instructions (case-insensitive)',
    example: 'delikatnie wymieszaj',
  })
  instruction?: string;

  @IsOptional()
  @IsEnum(CocktailCategory)
  @ApiPropertyOptional({
    description: 'Filter by cocktail category',
    example: 'SHOT',
    enum: CocktailCategory,
  })
  category?: CocktailCategory;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({ description: 'Filter by cocktail by ingredient id' })
  ingredientId?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter by cocktail by ingredient name',
    example: 'Lime',
  })
  ingredientName?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
    })
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Filter by alcoholic or non-alcoholic cocktails',
    example: true,
  })
  isAlcoholic?: boolean;

  @IsOptional()
  @IsEnum(CocktailSortBy)
  @ApiPropertyOptional({ enum: CocktailSortBy, default: CocktailSortBy.NAME })
  sortBy?: CocktailSortBy = CocktailSortBy.NAME;

  @IsOptional()
  @IsEnum(SortDirection)
  @ApiPropertyOptional({ enum: SortDirection, default: SortDirection.ASC })
  sortDirection?: SortDirection = SortDirection.ASC;
}
