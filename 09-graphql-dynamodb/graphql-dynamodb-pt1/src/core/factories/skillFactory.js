const SkillRepository = require('./../repositories/skillsRepository')
const SkillService = require('./../services/skillService')

async function createInstance() {
    const skillRepository = new SkillRepository()
    const skillService = new SkillService({
        repository: skillRepository
    })

    return skillService
}

module.exports = { createInstance } 