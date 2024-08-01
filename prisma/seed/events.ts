import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function seedEvents() {
  const tournament = await prisma.tournament.findFirst();
  const eventTypes = await prisma.eventType.findMany();

  // if (!tournament || !hundredMeters || !longJump) throw new Error('Required data not found');

  await prisma.event.createMany({
    data: eventTypes.map((eventType, index) => ({
        eventName: '100m Final',
        tournamentId: tournament?.tournamentId || 0,
        eventTypeId: eventType.eventTypeId,
        eventDate: new Date('2024-05-03'),
        eventTime: new Date('2024-05-03T10:00:00Z'),
      }))
  });
}
