import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { QueryCocktailDto } from './dto/query-cocktail.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('cocktails')
@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new cocktail' })
  create(@Body() createCocktailDto: CreateCocktailDto) {
    return this.cocktailsService.create(createCocktailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of cocktails with optional filters' })
  findAll(@Query() query: QueryCocktailDto) {
    return this.cocktailsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cocktail by its ID' })
  findOne(@Param('id') id: string) {
    return this.cocktailsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cocktail by its ID' })
  update(@Param('id') id: string, @Body() updateCocktailDto: UpdateCocktailDto) {
    return this.cocktailsService.update(+id, updateCocktailDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a cocktail by its ID' })
  remove(@Param('id') id: string) {
    return this.cocktailsService.remove(+id);
  }
}
