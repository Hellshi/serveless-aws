const resolvers = {
    Query: {
        async getSkill(root, args, context, info) {
            return 'Hello World'
        }
    },
    // POST (att, register, remove)
    Mutation: {
        async createSkill(root, args, context, info) {
            return 'Hello World!'
        }
    }
}

module.exports = resolvers