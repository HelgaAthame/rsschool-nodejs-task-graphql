import { GraphQLSchema } from "graphql";
import { memberTypeType, postType, profileType, userType } from "./types/types.js";
import { queryType } from "./queryType.js";

export const graphqlSchema: GraphQLSchema = new GraphQLSchema({
  types: [userType, memberTypeType, postType, profileType],
  mutation: mutationType,
  query: queryType,
});
