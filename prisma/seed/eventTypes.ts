import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function seedEventTypes() {
  const running = await prisma.eventCategory.findFirst({ where: { categoryName: 'Running' } });
  const jumping = await prisma.eventCategory.findFirst({ where: { categoryName: 'Jumping' } });

  if (!running || !jumping) throw new Error('Event categories not found');

  await prisma.eventType.createMany({
    data: [
      { eventTypeName: '100m', categoryId: running.categoryId },
      { eventTypeName: 'Long Jump', categoryId: jumping.categoryId },
    ],
  });
}
