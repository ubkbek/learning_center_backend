const PG = require('../../utils/postgres')

class UsersModel extends PG{

    async addStudent(name, password, phone){
        return await this.fetch(`
            INSERT INTO users(user_name, user_password, user_phone)
            VALUES($1, $2, $3)
            RETURNING *
        `, name, password, phone)
    }

    async allStudents(){
        return await this.fetch(`
            SELECT
                u.user_id as id,
                u.user_name as name,
                u.user_password as password,
                u.user_phone as phone,
                u.user_created_at as created_at,
                g.title as group
            FROM
                users u
            INNER JOIN
                student_groups sg
            ON
                u.user_id = sg.student_id
            INNER JOIN
                groups g
            ON
                sg.group_id = g.id
            WHERE user_status = 1
        `)
    }

    async addTeacher(name, password, phone, status, id){
        return await this.fetch(`
        INSERT INTO users(user_name, user_password, user_phone, user_status, course_id)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
        `, name, password, phone, status, id)
    }

    async verifyTeacher(name, password, phone, course){
        return await this.fetch(`
        SELECT
            *
        FROM
            users
        WHERE
            user_name = $1 AND user_password = $2 AND user_phone = $3 AND course_id = $4`,
        name, password, phone, course
        )
    }

    async getTeachers(){
        return await this.fetch(`
        SELECT
            user_id as id,
            user_name as name,
            user_password as password,
            user_phone as phone,
            title as course,
            price
        FROM
            users u
        JOIN
            courses c
        ON
            u.course_id = c.id
        WHERE
            user_status = 2
        ORDER BY
            user_created_at DESC`)
    }

    async getCourseTeachers(course_id){
        return await this.fetch(`SELECT * FROM users WHERE course_id = $1`, course_id)
    }


    async verifyStudent(name, password){
        return await this.fetch(`SELECT * FROM users WHERE user_name = $1 AND user_password = $2`, name, password)
    }

    async teacherGroups(teacher_id){
        return await this.fetch(`
            SELECT
                g.id,
                g.title,
                u.user_name as teacher,
                c.title as course
            FROM
                groups g
            INNER JOIN
                users u
            ON
                g.teacher_id = u.user_id
            INNER JOIN
                courses c
            ON
                c.id = g.course_id
            WHERE
                user_id = $1;
        `, teacher_id)
    }
}

module.exports = new UsersModel()