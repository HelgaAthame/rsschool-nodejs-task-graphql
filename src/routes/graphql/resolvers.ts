import { GraphQLResolveInfo } from "graphql";

export const getUsersResolver = async ({ prisma }, resolveInfo: GraphQLResolveInfo) => {
};

export const getMemberTypesResolver = async ({ prisma }) => {
  const result = await prisma.memberType.findMany();
  return result;
};

export const getProfilesResolver = async ({ prisma }) => {
  const result = await prisma.profile.findMany();
  return result;
};

export const getPostsResolver = async ({ prisma }) => {
  const result = await prisma.post.findMany();
  return result;
};

export const getUserByIdResolver = async ({ id }, { prisma }) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const getMemberTypeByIdResolver = async ({ id }, { prisma }) => {
  const memberType = await prisma.memberType.findUnique({
    where: {
      id,
    },
  });
  return memberType;
};

export const getProfileByIdResolver = async ({ id }, { prisma }) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });
  return profile;
};

export const getPostByIdResolver = async ({ id }, { prisma }) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
};
