import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';

const limit = 5;

export let prisma: PrismaClient = new PrismaClient();

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
      const res = validate(graphqlSchema, parse(req.body.query), [
        depthLimit(limit),
      ]);

      if (res.length) {
        return { errors: res };
      }
      prisma = fastify.prisma;

      const result = await graphql({
        schema: graphqlSchema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prisma: fastify.prisma },
      });

      return result;
    },
  });
};

export default plugin;
