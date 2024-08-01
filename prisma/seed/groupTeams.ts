import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function seedGroupTeams() {
  const teamA = await prisma.team.findFirst({ where: { teamName: 'Team A' } });
  const teamB = await prisma.team.findFirst({ where: { teamName: 'Team B' } });
  const groupA = await prisma.group.findFirst({ where: { groupName: 'Group A' } });
  const groupB = await prisma.group.findFirst({ where: { groupName: 'Group B' } });

  if (!teamA || !teamB || !groupA || !groupB) throw new Error('Required data not found');

  await prisma.groupTeam.createMany({
    data: [
      { groupId: groupA.groupId, teamId: teamA.teamId },
      { groupId: groupB.groupId, teamId: teamB.teamId },
    ],
  });
}
