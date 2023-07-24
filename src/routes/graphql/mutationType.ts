import { GraphQLObjectType } from 'graphql';
import { userMutations } from './queries/userMutations.js';
import { postMutations } from './queries/postMutations.js';
import { profileMutations } from './queries/profileMutations.js';

export const mutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    ...userMutations,
    ...postMutations,
    ...profileMutations,
  }),
});