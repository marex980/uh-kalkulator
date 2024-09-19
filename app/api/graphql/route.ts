import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';
import { gql } from 'graphql-tag';

const prisma = new PrismaClient();

const typeDefs = gql`
  type Ingredient {
    id: Int!
    name: String!
    carbsPer100g: Float!
  }

  type Query {
    ingredients: [Ingredient!]!
  }

  type Mutation {
    addIngredient(name: String!, carbsPer100g: Float!): Ingredient!
    updateIngredient(id: Int!, name: String!, carbsPer100g: Float!): Ingredient!
    deleteIngredient(id: Int!): Boolean!
  }
`;

const resolvers = {
  Query: {
    ingredients: async () => await prisma.ingredient.findMany(),
  },
  Mutation: {
    addIngredient: async (_: any, { name, carbsPer100g }: { name: string, carbsPer100g: number }) => {
      return await prisma.ingredient.create({
        data: { name, carbsPer100g },
      });
    },
    updateIngredient: async (_: any, { id, name, carbsPer100g }: { id: number, name: string, carbsPer100g: number }) => {
      return await prisma.ingredient.update({
        where: { id },
        data: { name, carbsPer100g },
      });
    },
    deleteIngredient: async (_: any, { id }: { id: number }) => {
      await prisma.ingredient.delete({ where: { id } });
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);
