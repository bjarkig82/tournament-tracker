import { queryType, intArg, objectType, list, extendType } from 'nexus';
import { PrismaClient } from '@prisma/client';
import { Tournament } from 'nexus-prisma';

const prisma = new PrismaClient();

// Extend the existing Tournament model from Prisma
objectType({
  name: Tournament.$name,
  description: Tournament.$description,
  definition(t) {
    t.field(Tournament.tournamentId)
    t.field(Tournament.tournamentName)
    t.field(Tournament.location)
    t.field(Tournament.startDate)
    t.field(Tournament.endDate)
  },
});

export const TournamentResponse = objectType({
  name: 'TournamentResponse',
  definition(t) {
    t.nonNull.list.field('tournaments', { type: 'Tournament' }); 
    t.nonNull.boolean('hasMore');
  },
});

export const TournamentQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('tournaments', {
      type: 'TournamentResponse',
      args: {
        limit: intArg({ default: 10 }),
        offset: intArg({ default: 0 }),
      },
      resolve: async (_, { limit, offset }) => {
        const tournaments = await prisma.tournament.findMany({
          take: limit,
          skip: offset,
        });
        const totalCount = await prisma.tournament.count();
        return {
          tournaments,
          hasMore: offset + tournaments.length < totalCount,
        };
      },
    });
  },
});
