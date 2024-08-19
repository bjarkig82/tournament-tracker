import { makeSchema } from 'nexus';
import path from 'path';

// Import types, queries, and mutations
import { Tournament } from './types/Tournament';
import { TournamentQueries } from './queries/TournamentQueries';
import { TournamentMutations } from './mutations/TournamentMutations';

export const schema = makeSchema({
  types: [
    // Types
    Tournament,
    // Users,
    // Queries
    TournamentQueries,
    // UserQueries,
    // Mutations
    TournamentMutations,
    // UserMutations,
  ],
  outputs: {
    schema: path.join(process.cwd(), 'graphql', 'schema.graphql'),
    typegen: path.join(process.cwd(), 'graphql', 'nexus-typegen.ts'),
  },
});
