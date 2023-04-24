const resolvers = {
    Query: {
        async getHero(root, args, context, info) {
            return 'Hello World'
        }
    },
    // POST (att, register, remove)
    Mutation: {
        async createHero(root, args, context, info) {
            return 'Hello World!'
        }
    }
}

module.exports = resolvers