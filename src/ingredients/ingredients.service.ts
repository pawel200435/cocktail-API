import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QueryIngredientDto } from './dto/query-ingredient.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async create(createIngredientDto: CreateIngredientDto) {
    try {
      const ingredient = await this.prisma.ingredient.create({
        data: createIngredientDto,
      });
      return ingredient;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryIngredientDto) {
    const { page = 1, limit = 10, search, isAlcohol } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.IngredientWhereInput = {};

    if (isAlcohol !== undefined) {
      where.isAlcohol = isAlcohol;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.ingredient.findMany({
        where: where,
        skip: skip,
        take: limit,
      }),
      this.prisma.ingredient.count({ where }),
    ]);

    return {
      data,
      meta: {
        //Return the pagination metadata
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit), //Calculate the total number of pages
      },
    };
  }

  async findOne(id: number) {
    const ingredient = await this.prisma.ingredient.findFirst({
      where: { id: id },
    });
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with id ${id} not found`);
    }

    return ingredient;
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    await this.findOne(id); //Call upper findOne method to check if record exists

    try {
      const updatedIngredient = await this.prisma.ingredient.update({
        where: { id: id },
        data: updateIngredientDto,
      });

      return updatedIngredient;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      return await this.prisma.ingredient.delete({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }
}
