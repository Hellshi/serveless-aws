const { readdirSync } = require('fs')

const {
    makeExecutableSchema,
    mergeSchemas,
    gql
} = require('apollo-server-lambda')

                // 1 READS DIR
const schemas = readdirSync(__dirname)
                //Ignores index.js file
                .filter(file => file !== 'index.js')
                // Requires every file index.js from folders (hero, skill, etc)
                .map(folder => require(`./${folder}`))
                // Creates a GraphQL schema
                .map(({ schema, resolvers }) => makeExecutableSchema({
                    // gql validates schema
                    // is not mandatory
                    typeDefs: gql(schema),
                    resolvers
                }))

/* 

hero resolver 

{
    Query: { getHero }
}

skill resolver 

{
    Query: { getSkill }
}

skill + hero = we will have Query's content override

mergeSchema: {
    Query: {
        getHero,
        gerSkill
    }
}

*/

module.exports = mergeSchemas({
    schemas
})