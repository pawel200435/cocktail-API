import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { CocktailsModule } from './cocktails/cocktails.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, IngredientsModule, CocktailsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
