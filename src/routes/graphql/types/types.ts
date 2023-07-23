import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import { memberTypeLoader, postLoader, profileLoader, subscribedToUserLoader, userSubscribedToLoader } from '../loaders.js';

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  }),
});

export const memberTypeType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  }),
});

export const profileTypeFields = {
  id: { type: new GraphQLNonNull(GraphQLString) },
  isMale: {
    type: GraphQLBoolean,
  },
  yearOfBirth: {
    type: GraphQLInt,
  },
  memberType: {
    type: memberTypeType,
    resolve: async (source) => {
      const memberType = await memberTypeLoader.load(source.memberTypeId);
      return memberType;
    },
  },
};

export const profileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({ ...profileTypeFields }),
});

export const userType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({ ...userFields }),
});

export const userSubscribedToType = new GraphQLObjectType({
  name: 'userSubscribedToType',
  fields: () => ({
    ...userFields,
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (source) => {
        const subscribedToUser = await subscribedToUserLoader.load(source.id);
        return subscribedToUser;
      },
    },
  }),
});

export const subscribedToUserType = new GraphQLObjectType({
  name: 'subscribedToUserType',
  fields: () => ({
    ...userFields,
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve:  async (source) => {
        const userSubscribedToUsers = await userSubscribedToLoader.load(source.id);
        return userSubscribedToUsers;
      },
    },
  }),
});

export const userFields = {
  id: { type: new GraphQLNonNull(GraphQLString) },
  name: {
    type: GraphQLString,
  },
  balance: {
    type: GraphQLFloat,
  },
  profile: {
    type: profileType,
    resolve: async (source) => {
      const userProfile = await profileLoader.load(source.id);
      return userProfile;
    },
  },
  posts: {
    type: new GraphQLList(postType),
    resolve: async (source) => {
      const userPosts = await postLoader.load(source.id);
      return userPosts;
    },
  },
  userSubscribedTo: {
    type: new GraphQLList(userSubscribedToType),
    resolve: async (source) => {
      const userSubscribedToUsers = await userSubscribedToLoader.load(source.id);
      return userSubscribedToUsers;
    },
  },
  subscribedToUser: {
    type: new GraphQLList(subscribedToUserType),
    resolve: async (source) => {
      const subscribedToUser = await subscribedToUserLoader.load(source.id);
      return subscribedToUser;
    },
  },
};
