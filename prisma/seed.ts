import { CocktailCategory, PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set in .env file');
}

const prisma = new PrismaClient({
    adapter: new PrismaPg({connectionString: connectionString}),
});

async function main() {
  console.log('Seeding database...');

  await prisma.cocktailItem.deleteMany();
  await prisma.cocktail.deleteMany();
  await prisma.ingredient.deleteMany();

  const ingredientMaps = new Map<string, number>();
  for (const item of ingredientsData) {
    const created = await prisma.ingredient.create({ data: item });
    ingredientMaps.set(created.name, created.id);
  }
  console.log(`Seeded ${ingredientMaps.size} ingredients.`);

  for (const cocktail of cocktailsData) {
    await prisma.cocktail.create({
        data: {
            name: cocktail.name,
            category: cocktail.category,
            instructions: cocktail.instructions,
            ingredients: {
                create: cocktail.items.map((item) => ({
                    amount: item.amount,
                    unit: item.unit,
                    ingredientId: ingredientMaps.get(item.name)!,
                })),
            },
        }
    })
  }

    console.log(`Seeded ${cocktailsData.length} cocktails.`);
    console.log('Database seeding completed.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


const ingredientsData = [
    {
      name: 'Jägermeister',
      description: 'Niemiecki likier ziołowo-korzenny o mocy 35% obj.',
      isAlcohol: true,
      imageUrl: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b',
    },
    {
      name: 'Red Bull',
      description: 'Klasyczny gazowany napój energetyczny',
      isAlcohol: false,
      imageUrl: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e',
    },
    {
      name: 'Piwo imbirowe (Ginger Beer)',
      description: 'Pikantny, bezalkoholowy napój gazowany o smaku imbiru',
      isAlcohol: false,
      imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87',
    },
    {
      name: 'Sok z limonki',
      description: 'Świeżo wyciskany sok z dojrzałych limonek',
      isAlcohol: false,
      imageUrl: 'https://images.unsplash.com/photo-1534432182912-63863115e106',
    },
    {
      name: 'Biały rum',
      description: 'Czysty, wytrawny destylat z trzciny cukrowej',
      isAlcohol: true,
      imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    },
    {
      name: 'Świeża mięta',
      description: 'Aromatyczne zielone liście mięty pieprzowej',
      isAlcohol: false,
      imageUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1',
    },
    {
      name: 'Cukier trzcinowy',
      description: 'Nierafinowany brązowy cukier z trzciny cukrowej',
      isAlcohol: false,
      imageUrl: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15',
    },
    {
      name: 'Woda gazowana',
      description: 'Mocno nasycona dwutlenkiem węgla woda źródlana',
      isAlcohol: false,
      imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e',
    },
    {
      name: 'Wódka',
      description: 'Neutralny, 40% destylat zbożowy lub ziemniaczany',
      isAlcohol: true,
      imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8',
    },
    {
      name: 'Likier kawowy (np. Kahlúa)',
      description: 'Słodki, gęsty likier na bazie ziaren kawy i rumu',
      isAlcohol: true,
      imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38',
    },
    {
      name: 'Śmietanka 30%',
      description: 'Płynna, słodka śmietana pasteryzowana',
      isAlcohol: false,
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    },
    {
      name: 'Sok grejpfrutowy',
      description: 'Cierpko-słodki sok z różowych grejpfrutów',
      isAlcohol: false,
      imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423',
    },
    {
      name: 'Syrop cukrowy',
      description: 'Klasyczny syrop z wody i cukru w proporcji 1:1',
      isAlcohol: false,
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    },
];



const cocktailsData = [
    {
        name: 'Jägerbomb',
        category: CocktailCategory.SHOT,
        instructions:
        'Nalej napój energetyczny Red Bull do szklanki typu highball. Nalej porcję schłodzonego Jägermeistera do kieliszka typu shot. Upuść kieliszek ze shotem do szklanki z Red Bullem i wypij natychmiast.',
        items: [
        { name: 'Jägermeister', amount: 40, unit: 'ml' },
        { name: 'Red Bull', amount: 150, unit: 'ml' },
        ],
    },
    {
        name: 'Berlin Mule (Jäger Mule)',
        category: CocktailCategory.LONG_DRINK,
        instructions:
        'Napełnij miedziany kubek lub wysoką szklankę kostkami lodu. Wlej Jägermeister oraz świeży sok z limonki. Dopełnij pikantnym piwem imbirowym (Ginger Beer) i delikatnie zamieszaj łyżką barmańską. Udekoruj ćwiartką limonki.',
        items: [
        { name: 'Jägermeister', amount: 50, unit: 'ml' },
        { name: 'Piwo imbirowe (Ginger Beer)', amount: 120, unit: 'ml' },
        { name: 'Sok z limonki', amount: 20, unit: 'ml' },
        ],
    },
    {
        name: 'Klasyczne Mojito',
        category: CocktailCategory.LONG_DRINK,
        instructions:
        'W wysokiej szklance rozgnieć muddlerem liście mięty z cukrem trzcinowym i sokiem z limonki. Dodaj biały rum, zasyp kruszonym lodem do 3/4 wysokości i dopełnij wodą gazowaną. Dokładnie wymieszaj od dołu do góry.',
        items: [
        { name: 'Biały rum', amount: 50, unit: 'ml' },
        { name: 'Świeża mięta', amount: 8, unit: 'listki' },
        { name: 'Sok z limonki', amount: 25, unit: 'ml' },
        { name: 'Cukier trzcinowy', amount: 2, unit: 'łyżeczki' },
        { name: 'Woda gazowana', amount: 100, unit: 'ml' },
        ],
    },
    {
        name: 'Biały Rosjanin (White Russian)',
        category: CocktailCategory.LONG_DRINK,
        instructions:
        'Do szklanki typu old fashioned wypełnionej lodem wlej wódkę oraz likier kawowy. Na wierzch powoli wlej słodką śmietankę po grzbiecie łyżki, aby utworzyła delikatną warstwę.',
        items: [
        { name: 'Wódka', amount: 50, unit: 'ml' },
        { name: 'Likier kawowy (np. Kahlúa)', amount: 25, unit: 'ml' },
        { name: 'Śmietanka 30%', amount: 30, unit: 'ml' },
        ],
    },
    {
        name: 'Virgin Paloma (Bezalkoholowy)',
        category: CocktailCategory.LONG_DRINK,
        instructions:
        'Brzeg szklanki zwilż sokiem z limonki i obtocz w soli. Wypełnij szklankę lodem, wlej sok grejpfrutowy, sok z limonki oraz syrop cukrowy. Dopełnij wodą gazowaną i delikatnie wymieszaj.',
        items: [
        { name: 'Sok grejpfrutowy', amount: 90, unit: 'ml' },
        { name: 'Sok z limonki', amount: 15, unit: 'ml' },
        { name: 'Syrop cukrowy', amount: 15, unit: 'ml' },
        { name: 'Woda gazowana', amount: 90, unit: 'ml' },
        ],
    },
];