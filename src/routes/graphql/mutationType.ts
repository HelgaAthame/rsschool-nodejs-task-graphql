import { GraphQLObjectType } from 'graphql';
import { userMutations } from './queries/userMutations.js';

export const mutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    ...userMutations,
  }),
});