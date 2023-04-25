const resolvers = {
    Query: {
        async getHero(root, args, context, info) {
            console.log({
                args
            })

            return context.Hero.findAll(args)
        }
    },
    // POST (att, register, remove)
    Mutation: {
        async createHero(root, args, context, info) {
            const { id } = await context.Hero.create(args)
            return id
        }
    }
}

module.exports = resolvers