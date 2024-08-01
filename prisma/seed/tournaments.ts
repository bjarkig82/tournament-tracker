import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export default async  function seedTournaments() {
  // Clear existing data
  // await prisma.tournament.deleteMany();

  for (let i = 0; i < 20; i++) {
    const startDate = faker.date.between({from: new Date(2020, 0, 1), to: new Date(2026, 0, 0)});
    const endDate = startDate;
    endDate.setDate(endDate.getDate() + (Math.floor(Math.random() * 3)));

    await prisma.tournament.create({
      data: {
        tournamentName: faker.company.name(),
        startDate: startDate,
        endDate: endDate,
        location: faker.location.city(),
      },
    });
  }
}
