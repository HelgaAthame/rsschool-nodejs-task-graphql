import { GraphQLObjectType } from 'graphql';
import { userMutations } from './queries/userMutations.js';
import { postMutations } from './queries/postMutations.js';

export const mutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    ...userMutations,
    ...postMutations,
  }),
});