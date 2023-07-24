import { GraphQLList, GraphQLNonNull } from 'graphql';

import { getMemberTypeById, getMemberTypes } from '../actions/memberTypeActions.js';
import { Context } from '../types/contextType.js';
import { MemberType } from '../types/memberTypeType.js';
import { MemberTypeId } from '../types/memberTypeId.js';

export const memberTypeQueries = {
  memberType: {
    type: MemberType,
    args: {
      id: {
        type: new GraphQLNonNull(MemberTypeId),
      },
    },
    resolve: (_source: unknown, { id }, context: Context) => {
      return getMemberTypeById(id, context);
    },
  },
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: (_source: unknown, _args: unknown, context: Context) => {
      return getMemberTypes(context);
    },
  },
};