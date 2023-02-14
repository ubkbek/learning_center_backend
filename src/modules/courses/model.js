const PG = require('../../utils/postgres.js')

class CourseModel extends PG{
    async getCourses(){
        return await this.fetch(`SELECT * FROM courses ORDER BY title`)
    }

    async addCourses(title, price){
        return await this.fetch(`INSERT INTO courses(title, price) VALUES($1, $2) RETURNING *`, title, price)
    }

    async verifyCourse(title){
        return await this.fetch(`SELECT * FROM courses WHERE title=$1`, title)
    }

    async deleteCourse(id){
        return await this.fetch(`DELETE FROM courses WHERE id = $1 RETURNING *`, id)
    }

    async updateCourses(title, price, id){
        const [oldCourse] = await this.fetch(`SELECT * FROM courses WHERE id = $1`, id)

        return await this.fetch(`
        UPDATE
            courses
        SET
            title = $1,
            price = $2
        WHERE
            id = $3
        RETURNING *
        `,
        title || oldCourse.title,
        price || oldCourse.price,
        id
        )
    }
}

module.exports = new CourseModel()