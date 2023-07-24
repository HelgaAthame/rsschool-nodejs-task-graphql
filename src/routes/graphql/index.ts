import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { graphqlSchema } from './schemas.js'; 
import depthLimit from 'graphql-depth-limit';
import loaders from './loaders.js';

const limit = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const graphQLerrors = validate(graphqlSchema, parse(req.body.query), [depthLimit(limit)]);
      if (graphQLerrors && graphQLerrors.length != 0) {
        return { data: null, errors: graphQLerrors };
      }
      const { data, errors } = await graphql({
        schema: graphqlSchema,
        source: req.body.query,
        contextValue: {
          prisma: fastify.prisma,
          loader: loaders(fastify.prisma),
        },
        variableValues: req.body.variables,
      });

      return { data, errors };
    },
  });
};

export default plugin;
