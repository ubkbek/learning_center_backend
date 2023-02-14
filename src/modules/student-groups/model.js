const PG = require('../../utils/postgres')

class StudentGroupModel extends PG{
    async addStudentGroups(student_id, group_id){
        return await this.fetch(`
            INSERT INTO student_groups(student_id, group_id)
            VALUES($1::int, $2::int)
            RETURNING *
        `, student_id, group_id)
        }
    }

module.exports = new StudentGroupModel()