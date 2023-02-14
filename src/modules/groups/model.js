const PG = require('../../utils/postgres')

class groupModel extends PG{
    async addGroups(title, course_id, teacher_id){
        return await this.fetch(`
            INSERT INTO groups(title, course_id, teacher_id)
            VALUES($1, $2, $3)
            RETURNING *
        `, title, course_id, teacher_id)
    }

    async verifyGroups(title, course_id, teacher_id){
        return await this.fetch(`
            SELECT * FROM groups WHERE title = $1 AND course_id = $2 AND teacher_id = $3
        `, title, course_id, teacher_id
        )
    }

    async allGroups(){
        return await this.fetch(`
        SELECT
            g.id AS id,
            g.title AS title,
            u.user_name AS teacher,
            u.user_phone AS phone,
            c.title AS course,
            c.price AS price
        FROM
            groups g
        INNER JOIN
            users u
        ON
            g.teacher_id = u.user_id
        INNER JOIN
            courses c
        ON
            g.course_id = c.id
        ORDER BY g.title
        `)
    }

    async studentGroups(student_id){
        return await this.fetch(`
            SELECT
                u.user_id as id,
                g.title,
                g.id as group_id
            FROM
                student_groups sg
            JOIN
                users u
            ON
                sg.student_id = u.user_id
            JOIN
                groups g
            ON
                sg.group_id = g.id
            WHERE
                u.user_id = $1
        `, student_id)
    }
}

module.exports = new groupModel()