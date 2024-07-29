import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Alice Smith',
        username: 'alice',
        password: 'password123',
        email: 'alice@example.com',
        role: 'admin',
      },
      {
        name: 'Bob Johnson',
        username: 'bob',
        password: 'password123',
        email: 'bob@example.com',
        role: 'coach',
      },
      {
        name: 'Charlie Brown',
        username: 'charlie',
        password: 'password123',
        email: 'charlie@example.com',
        role: 'participant',
      },
    ],
  });

  // Seed Teams
  const teamA = await prisma.team.create({
    data: {
      teamName: 'Team A',
      coach: {
        connect: { username: 'bob' },
      },
    },
  });

  const teamB = await prisma.team.create({
    data: {
      teamName: 'Team B',
      coach: {
        connect: { username: 'bob' },
      },
    },
  });

  // Seed Athletes
  await prisma.athlete.createMany({
    data: [
      {
        name: 'David Doe',
        dateOfBirth: new Date('2000-01-01'),
        gender: 'male',
        teamId: teamA.teamId,
      },
      {
        name: 'Eve Evans',
        dateOfBirth: new Date('2001-02-02'),
        gender: 'female',
        teamId: teamA.teamId,
      },
      {
        name: 'Frank Foster',
        dateOfBirth: new Date('2002-03-03'),
        gender: 'male',
        teamId: teamB.teamId,
      },
    ],
  });

  // Seed Tournament
  const tournament = await prisma.tournament.create({
    data: {
      tournamentName: 'Spring Championship',
      location: 'Stadium XYZ',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-05-10'),
    },
  });

  // Seed Event Categories
  const runningCategory = await prisma.eventCategory.create({
    data: {
      categoryName: 'Running',
    },
  });

  const jumpingCategory = await prisma.eventCategory.create({
    data: {
      categoryName: 'Jumping',
    },
  });

  // Seed Event Types
  const hundredMeters = await prisma.eventType.create({
    data: {
      eventTypeName: '100m',
      categoryId: runningCategory.categoryId,
    },
  });

  const longJump = await prisma.eventType.create({
    data: {
      eventTypeName: 'Long Jump',
      categoryId: jumpingCategory.categoryId,
    },
  });

  // Seed Events
  const event1 = await prisma.event.create({
    data: {
      eventName: '100m Final',
      tournamentId: tournament.tournamentId,
      eventTypeId: hundredMeters.eventTypeId,
      eventDate: new Date('2024-05-03'),
      eventTime: new Date('2024-05-03T10:00:00Z'),
    },
  });

  const event2 = await prisma.event.create({
    data: {
      eventName: 'Long Jump Final',
      tournamentId: tournament.tournamentId,
      eventTypeId: longJump.eventTypeId,
      eventDate: new Date('2024-05-04'),
      eventTime: new Date('2024-05-04T14:00:00Z'),
    },
  });

  // Seed Groups
  const groupA = await prisma.group.create({
    data: {
      groupName: 'Group A',
      tournamentId: tournament.tournamentId,
    },
  });

  const groupB = await prisma.group.create({
    data: {
      groupName: 'Group B',
      tournamentId: tournament.tournamentId,
    },
  });

  // Seed Group Teams
  await prisma.groupTeam.createMany({
    data: [
      { groupId: groupA.groupId, teamId: teamA.teamId },
      { groupId: groupB.groupId, teamId: teamB.teamId },
    ],
  });

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
