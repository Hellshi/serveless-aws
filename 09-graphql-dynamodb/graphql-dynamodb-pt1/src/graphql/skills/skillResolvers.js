const resolvers = {
    Query: {
        async getSkill(root, args, context, info) {
            return context.Skill.findAll(args)
        }
    },
    // POST (att, register, remove)
    Mutation: {
        async createSkill(root, args, context, info) {
            const { id } = await context.Skill.create(args)
            return id        }
    }
}

module.exports = resolvers