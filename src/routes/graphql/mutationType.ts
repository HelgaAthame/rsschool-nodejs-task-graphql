import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { postType, profileType, userType } from './types/types.js';
import { createPostInput, createProfileInput, createUserInput } from './inputs.js';
import {
  createPost,
  createProfile,
  createUser,
  deletePost,
  deleteProfile,
  deleteUser,
} from './resolvers.js';
import { UUIDType } from './types/uuid.js';

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

export const deleteMutationFields = {
  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_source, args) => await deletePost(args),
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_source, args) => await deleteUser(args),
  },
  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_source, args) => await deleteProfile(args),
  },
};

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...createMutationFields,
    ...deleteMutationFields,
  }),
});
