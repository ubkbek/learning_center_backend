const courseModel = require('./model')

class CourseController{
    async GET(req, res){
        try {
            return res.json(await courseModel.getCourses())
        } catch (err) {
            console.log(err);
        }
    }

    async POST(req, res){
        try {
            const { title, price } = req.body
            const [newCourse] = await courseModel.addCourses(title, price)
            if(newCourse){
                res.json({
                    status: 200,
                    message: "Course has been created",
                    data: newCourse
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    async DELETE(req, res){
        const { id } = req.params
        const [course] = await courseModel.deleteCourse(id)
        console.log(course);
        if(course){
            res.json({
                status: 200,
                message: "Course has been deleted"
            })
        }
    }

    async UPDATE(req, res){
        try {
            const { id } = req.params
            const { title, price } = req.body

            console.log(id, title, price);

            const newCourse = await courseModel.updateCourses(title, price, id)

            if(newCourse){
                res.json('ok')
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new CourseController()
