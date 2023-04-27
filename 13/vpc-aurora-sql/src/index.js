const { sequelize, HeroesSchema } = require("./database")
const { faker } = require('@faker-js/faker')

const handler = async event => {
    try {
        console.log(process.env)
        await sequelize.authenticate()
        await HeroesSchema.sync()
        const result = await HeroesSchema.create({
            nome: faker.name.fullName(),
            power: faker.name.jobTitle()
        })

        const all = await HeroesSchema.findAll({
            raw: true,
            attributes: ['nome', 'power', 'id']
        })

        return {
            body: JSON.stringify({all, result}),
            statusCode: 200
        }

    } catch (error) {
        console.log('Connection error', error.stack)
        return {
            statusCode: 500,
            body: 'ERR'
        }
    }
}

exports.handler = handler