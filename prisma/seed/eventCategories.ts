import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function seedEventCategories() {
  await prisma.eventCategory.createMany({
    data: [
      { categoryName: 'Running' },
      { categoryName: 'Jumping' },
      { categoryName: 'Throwing' },
    ],
  });
}
