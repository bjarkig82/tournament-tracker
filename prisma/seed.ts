import { PrismaClient } from '@prisma/client';
import seedUsers from './seed/users';
import seedTeams from './seed/teams';
import seedAthletes from './seed/athletes';
import seedTournaments from './seed/tournaments';
import seedEventCategories from './seed/eventCategories';
import seedEventTypes from './seed/eventTypes';
import seedEvents from './seed/events';
import seedGroups from './seed/groups';
import seedGroupTeams from './seed/groupTeams';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Seeding Users...');
    await seedUsers();
    console.log('Seeding Teams...');
    await seedTeams();
    console.log('Seeding Athletes...');
    await seedAthletes();
    console.log('Seeding Tournaments...');
    await seedTournaments();
    console.log('Seeding Event Categories...');
    await seedEventCategories();
    console.log('Seeding Event Types...');
    await seedEventTypes();
    console.log('Seeding Events...');
    await seedEvents();
    console.log('Seeding Groups...');
    await seedGroups();
    console.log('Seeding Group Teams...');
    await seedGroupTeams();
    
    console.log('Database has been seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
