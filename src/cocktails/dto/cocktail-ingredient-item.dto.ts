import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CocktailIngredientItemDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ description: 'The ID of the cocktail ingredient', example: 1 })
  ingredientId!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    description: 'The amount of the cocktail ingredient',
    example: 1.5,
  })
  amount!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({
    description: 'The unit of the cocktail ingredient (ml, szt, g)',
    example: 'ml',
  })
  unit!: string;
}
