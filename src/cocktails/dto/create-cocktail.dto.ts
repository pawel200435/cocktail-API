import { ApiProperty } from "@nestjs/swagger";
import { CocktailIngredientItemDto } from "./cocktail-ingredient-item.dto";
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";
import { CocktailCategory } from "../../generated/prisma/enums";
import { Type } from "class-transformer";

export class CreateCocktailDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty({ description: "The name of the cocktail", example: "Jägermeister" })
    name!: string;

    @IsEnum(CocktailCategory)
    @ApiProperty({ description: "The category of the cocktail", example: "SHOT" , enum: CocktailCategory })
    category!: CocktailCategory;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "The instructions for preparing the cocktail", example: "Shake well, add ice and serve cold." })
    instructions!: string

    @IsArray()
    @ArrayMinSize(1)
    @Type(() => CocktailIngredientItemDto)
    @ValidateNested({ each: true })
    @ApiProperty({ description: "The ingredients of the cocktail", type: [CocktailIngredientItemDto] })
    ingredients!: CocktailIngredientItemDto[];
}
