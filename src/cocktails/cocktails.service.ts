import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { QueryCocktailDto } from './dto/query-cocktail.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from 'rxjs';
import { Prisma } from '../generated/prisma/browser';
import { CocktailCategory } from '../generated/prisma/enums';
import { CocktailIngredientItemDto } from './dto/cocktail-ingredient-item.dto';

@Injectable()
export class CocktailsService {
  constructor(private prisma: PrismaService) {}

  private readonly cocktailInclude = {
    ingredients: {
      select: {
        amount: true,
        unit: true,
        ingredient: {
          select: {
            id: true,
            name: true,
            description: true,
            isAlcohol: true,
            imageUrl: true,
          },
        },
      },
    },
  };

  async create(createCocktailDto: CreateCocktailDto) {
    const { ingredients, ...cocktailData } = createCocktailDto;
    await this.validateIngredients(ingredients);

    return this.prisma.cocktail.create({
      data: {
        ...cocktailData,
        ingredients: {
          create: ingredients.map((item) => ({
            amount: item.amount,
            unit: item.unit,
            ingredient: {
              connect: { id: item.ingredientId },
            },
          })),
        },
      },
    });
  }

  async findAll(query: QueryCocktailDto) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      ingredientId,
      ingredientName,
      isAlcoholic,
    } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.CocktailWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { instructions: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    // Filter by ingredientId or ingredientName
    const ingredientFilters: Prisma.CocktailItemWhereInput[] = [];
    if (ingredientId) {
      ingredientFilters.push({ ingredientId });
    }
    if (ingredientName) {
      ingredientFilters.push({
        ingredient: { name: { contains: ingredientName, mode: 'insensitive' } },
      });
    }

    if (ingredientFilters.length > 0) {
      where.ingredients = {
        some: {
          AND: ingredientFilters,
        },
      };
    }

    // Filter by alcohol
    if (isAlcoholic !== undefined) {
      if (isAlcoholic) {
        where.ingredients = {
          ...where.ingredients,
          some: { ingredient: { isAlcohol: true } },
        };
      } else {
        where.ingredients = {
          ...where.ingredients,
          none: { ingredient: { isAlcohol: true } },
        };
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.cocktail.findMany({
        where,
        skip,
        take: limit,
        include: this.cocktailInclude,
      }),
      this.prisma.cocktail.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const cocktail = await this.prisma.cocktail.findUnique({
      where: { id },
      include: this.cocktailInclude,
    });

    if (!cocktail) {
      throw new NotFoundException(`Cocktail with ID ${id} not found`);
    }

    return cocktail;
  }

  async update(id: number, updateCocktailDto: UpdateCocktailDto) {
    await this.findOne(id);

    const { ingredients, ...cocktailData } = updateCocktailDto;
    const dataToUpdate: Prisma.CocktailUpdateInput = {
      ...cocktailData,
    };

    if (ingredients) {
      await this.validateIngredients(ingredients);

      dataToUpdate.ingredients = {
        deleteMany: {}, // Remove existing ingredients
        create: ingredients.map((item) => ({
          amount: item.amount,
          unit: item.unit,
          ingredient: {
            connect: { id: item.ingredientId },
          },
        })),
      };
    }

    return this.prisma.cocktail.update({
      where: { id },
      data: dataToUpdate,
      include: this.cocktailInclude,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.cocktail.delete({
      where: { id },
    });
  }

  private async validateIngredients(ingredients: CocktailIngredientItemDto[]) {
    const ingredientIds = ingredients.map((item) => item.ingredientId); // Extract ingredient IDs from the ingredients array
    const uniqueIds = new Set(ingredientIds); // Remove duplicates

    if (uniqueIds.size !== ingredientIds.length) {
      // Check if there are duplicates
      throw new BadRequestException(
        'Duplicate ingredient IDs are not allowed.',
      );
    }

    //Check if all ingredient IDs exist in the database
    const existingIngredients = await this.prisma.ingredient.findMany({
      where: { id: { in: ingredientIds } },
      select: { id: true },
    });
    if (existingIngredients.length !== ingredientIds.length) {
      throw new NotFoundException(
        'One or more ingredient IDs do not exist in the database.',
      );
    }
  }
}
