import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { postType, profileType, userType } from './types/types.js';
import { createPostInput, createProfileInput, createUserInput } from './inputs.js';
import { createPost, createProfile, createUser } from './resolvers.js';

const createMutationFields = {
  createPost: {
    type: postType,
    args: {
      dto: {
        type: new GraphQLNonNull(createPostInput),
      },
    },
    resolve: async (_source, args) => await createPost(args),
  },
  createUser: {
    type: userType,
    args: {
      dto: {
        type: new GraphQLNonNull(createUserInput),
      },
    },
    resolve: async (_source, args) => await createUser(args),
  },
  createProfile: {
    type: profileType,
    args: {
      dto: {
        type: new GraphQLNonNull(createProfileInput),
      },
    },
    resolve: async (_source, args) => await createProfile(args),
  },
};

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...createMutationFields,
  }),
});
