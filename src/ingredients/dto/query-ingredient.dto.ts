import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum IngredientSortBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class QueryIngredientDto {
  @IsOptional()
  @Type(() => Number) //Transform the value to a number
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
    minimum: 1,
  })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter by ingredient name (case-insensitive)',
    example: 'wódka',
  })
  name?: string;

  @ApiPropertyOptional({ description: 'Filter by ingredient description (case-insensitive)' })
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Filter ingredients by alcoholic content',
    example: true,
  })
  isAlcohol?: boolean;

  @IsOptional()
  @IsEnum(IngredientSortBy)
  @ApiPropertyOptional({ enum: IngredientSortBy, default: IngredientSortBy.NAME })
  sortBy?: IngredientSortBy = IngredientSortBy.NAME;

  @IsOptional()
  @IsEnum(SortDirection)
  @ApiPropertyOptional({ enum: SortDirection, default: SortDirection.ASC })
  sortDirection?: SortDirection = SortDirection.ASC;
}
