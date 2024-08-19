import { queryType, intArg, list } from 'nexus';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const TournamentQueries = queryType({
  definition(t) {
    t.field('GetTournaments', {
      type: list('Tournament'),
      args: {
        limit: intArg({ default: 10 }),
        offset: intArg({ default: 0 }),
      },
      resolve: (_, { limit, offset }) => {
        return prisma.tournament.findMany({
          take: limit,
          skip: offset,
        });
      },
    });
  },
});
