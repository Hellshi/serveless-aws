const Sequelize = require('sequelize')
const connection = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
}

const sequelize = new Sequelize(
    connection.database,
    connection.user,
    connection.password,
    {
        host: connection.host,
        dialect: 'mysql',
        // case sensitive
        quoteIdentifiers: false,
    }
)

const Heroes = sequelize.define('heroes',
    {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: Sequelize.STRING,
            required: true,
        },
        power: {
            type: Sequelize.STRING,
            required: true,
        }
    },
    {
        tableName: 'TB_HEROES',
        freezeTableName: false, 
        timestamps: false
    }

)

module.exports = {
    HeroesSchema: Heroes,
    sequelize
}