import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { faker } from '@faker-js/faker';

export default async function seedAthletes() {
  const teams = await prisma.team.findMany();
  const teamIds = teams.map(team => team.teamId);
  
  const getRandomDateOfBirth = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const getRandomTeamId = () => {
    const index = Math.floor(Math.random() * (teamIds.length - 1))
    return teamIds[index];
  }

  const athletesData = Array.from({ length: 100 }).map((i) => ({
    name: faker.person.fullName(),
    dateOfBirth: faker.date.birthdate({min: 10, max: 16}),
    gender: faker.person.sex(),
    teamId: getRandomTeamId(),
  }));

  await prisma.athlete.createMany({
    data: athletesData,
  });

  console.log('Seeded 100 athletes.');
}
