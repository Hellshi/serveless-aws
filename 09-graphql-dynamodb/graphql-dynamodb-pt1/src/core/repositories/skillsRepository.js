const BaseRepository = require("./baseRepository");

const schema = require('./schema/skillSchema')

class SkillsRepository extends BaseRepository {
    constructor() {
        super({
            schema
        })
    }
}

module.exports = SkillsRepository