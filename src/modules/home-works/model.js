const PG = require('../../utils/postgres')

class homeWorkModel extends PG{
    async addHomeWork(title, content, group_id){
        return await this.fetch(`
            INSERT INTO homeworks(title, content, group_id)
            VALUES($1, $2, $3)
            RETURNING *
        `, title, content, group_id)
    }

    async groupHomeworks(group_id){
        return await this.fetch(`SELECT * FROM homeworks WHERE group_id = $1`, group_id)
    }
}

module.exports = new homeWorkModel()