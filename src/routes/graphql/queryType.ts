import { GraphQLObjectType } from "graphql";

export const queryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
    }),
  });