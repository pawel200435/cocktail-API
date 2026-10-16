import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ description: 'Name of the ingredient', example: 'Vodka' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of the ingredient',
    example: 'A clear, colorless spirit',
  })
  description!: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Indicates if the ingredient is alcoholic',
    example: true,
  })
  isAlcohol!: boolean;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsUrl({}, { message: 'imageUrl must be a valid URL' })
  @ApiProperty({
    description: 'URL of the ingredient image',
    example: 'https://example.com/vodka.jpg',
  })
  imageUrl!: string;
}
