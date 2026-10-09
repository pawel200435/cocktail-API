-- CreateEnum
CREATE TYPE "cocktail_category" AS ENUM ('SHOT', 'LONG_DRINK');

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "is_alcohol" BOOLEAN NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cocktails" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "category" "cocktail_category" NOT NULL,
    "instructions" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cocktails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cocktail_items" (
    "cocktail_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "unit" VARCHAR(20) NOT NULL,

    CONSTRAINT "cocktail_items_pkey" PRIMARY KEY ("cocktail_id","ingredient_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

-- AddForeignKey
ALTER TABLE "cocktail_items" ADD CONSTRAINT "cocktail_items_cocktail_id_fkey" FOREIGN KEY ("cocktail_id") REFERENCES "cocktails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cocktail_items" ADD CONSTRAINT "cocktail_items_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
