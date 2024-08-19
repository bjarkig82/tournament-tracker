import { mutationType, nonNull, stringArg, intArg } from 'nexus';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const TournamentMutations = mutationType({
  definition(t) {
    t.field('createTournament', {
      type: 'Tournaments',
      args: {
        tournamentName: nonNull(stringArg()),
        location: nonNull(stringArg()),
        startDate: nonNull('DateTime'),
        endDate: nonNull('DateTime'),
      },
      resolve: (_, args) => {
        return prisma.tournament.create({
          data: {
            tournamentName: args.tournamentName,
            location: args.location,
            startDate: args.startDate,
            endDate: args.endDate,
          },
        });
      },
    });
  },
});
