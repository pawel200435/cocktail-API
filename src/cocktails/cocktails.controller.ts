import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { QueryCocktailDto } from './dto/query-cocktail.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('cocktails')
@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new cocktail' })
  create(@Body() createCocktailDto: CreateCocktailDto, @Req() req: any) {
    return this.cocktailsService.create(createCocktailDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of cocktails with optional filters' })
  findAll(@Query() query: QueryCocktailDto) {
    return this.cocktailsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cocktail by its ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cocktailsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a cocktail by its ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCocktailDto: UpdateCocktailDto,
    @Req() req: any
  ) {
    return this.cocktailsService.update(id, updateCocktailDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a cocktail by its ID' })
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.cocktailsService.remove(id, req.user.id, req.user.role);
  }
}
