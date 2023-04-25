'use strict';

const { ApolloServer, gql } = require('apollo-server-lambda');
const setupDynamoDBClient = require('./src/core/util/setupDynamoDB')
setupDynamoDBClient()

const HeroFactory = require('./src/core/factories/heroFactory')
const SkillFactory = require('./src/core/factories/skillFactory')

const isLocal = process.env.IS_LOCAL

const schema = require('./src/graphql')

const server = new ApolloServer({
  schema ,
  // permitir execucao no frontend e obtencao dos schemas
  introspection: isLocal,
  context: async() => ({
    Hero: await HeroFactory.createInstance(),
    Skill: await SkillFactory.createInstance()
  }),
  // frontend
  playground: isLocal,
  /* formatError(error) {
    console.error('[Global error logger]', error)
    return error
  },
  formatResponse(response) {
    console.log('[Global logger]', response)
    return response
  } */
});


exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
