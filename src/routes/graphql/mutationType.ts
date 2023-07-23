import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { postType, profileType, userType } from './types/types.js';
import {
  changePostInput,
  changeProfileInput,
  changeUserInput,
  createPostInput,
  createProfileInput,
  createUserInput,
} from './inputs.js';
import {
  changePost,
  changeProfile,
  changeUser,
  createPost,
  createProfile,
  createUser,
  deletePost,
  deleteProfile,
  deleteUser,
  subscribeToResolver,
  unsubscribeFromResolver,
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

export const changeMutationFields = {
  changePost: {
    type: postType,
    args: {
      dto: {
        type: new GraphQLNonNull(changePostInput),
      },
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args) => await changePost(args),
  },
  changeUser: {
    type: userType,
    args: {
      dto: {
        type: new GraphQLNonNull(changeUserInput),
      },
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args) => await changeUser(args),
  },
  changeProfile: {
    type: profileType,
    args: {
      dto: {
        type: new GraphQLNonNull(changeProfileInput),
      },
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args) => await changeProfile(args),
  },
};

export const subMutationFields = {
  subscribeTo: {
    type: userType,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    resolve: async (_source, args) => await subscribeToResolver(args),
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    resolve: async (_source, args) => await unsubscribeFromResolver(args),
  },
};

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...createMutationFields,
    ...deleteMutationFields,
    ...changeMutationFields,
    ...subMutationFields,
  }),
});
