import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function seedGroups() {
  const tournament = await prisma.tournament.findFirst();

  await prisma.group.createMany({
    data: [
      { groupName: 'Group A', tournamentId: tournament?.tournamentId || 0},
      { groupName: 'Group B', tournamentId: tournament?.tournamentId || 0 },
    ],
  });
}
