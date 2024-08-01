import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function seedTeams() {
  const numberOfTeams = 10;
  const coaches = await prisma.user.findMany();
  const coach = await prisma.user.findFirst();
  
  const teamsData = Array.from({ length: numberOfTeams }).map((_, index) => {
    // const coach = coaches[(coaches.length - 1) % index]
    
    return {
      teamName: `Team ${String.fromCharCode(65 + index)}`, // Team A, Team B, ..., Team J
      coachId: coach?.userId || 0,
    }
  });

  await prisma.team.createMany({
    data: teamsData,
  });

  console.log('Seeded 10 teams.');
}
