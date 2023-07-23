import { GraphQLSchema } from "graphql";

export const graphqlSchema: GraphQLSchema = new GraphQLSchema({
  types: [userType, memberTypeType, postType, profileType],
  mutation: mutationType,
  query: queryType,
});
