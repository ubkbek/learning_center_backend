const usersModel = require('./model')

class UsersController{

    async GET_STUDENTS(req, res){
        try {
           const students = await usersModel.allStudents()
           if(students){
            return res.json(students)
           }
        } catch (err) {
            console.log(err.message);
        }
    }

    async POST_STUDENT(req, res){
        try {
            const { name, password, phone } = req.body
            const [newUser] = await usersModel.addStudent(name, password, phone)

            if(newUser){
                return res.json(newUser)
            }
        } catch (err) {
            console.log(err);
        }
    }

    async POST_TEACHER(req, res){
        try {
            const status = 2
            const { name, password, phone, course } = req.body
            const [newTeacher] = await usersModel.addTeacher(name, password, phone, status, course)

            if(newTeacher){
                return res.json({
                    status: 201,
                    message: "Teacher has been created!",
                    data: newTeacher
                })
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    async GET_TEACHERS(req, res){
        try {
            const teachers = await usersModel.getTeachers()
            if(teachers){
                return res.json(teachers)
            }
        } catch (err) {
            console.log(err);
        }
    }

    async GET_COURSE_TEACHERS(req, res){
        try {
            const { course_id } = req.params
            const teachers = await usersModel.getCourseTeachers(course_id)

            if(teachers){
                return res.json(teachers)
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    async TEACHER_GROUPS(req, res){
        try {
            const teacher_id = req.verifyId
            const teacherGroups = await usersModel.teacherGroups(teacher_id)
            if(teacherGroups){
                return res.json(teacherGroups)
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = new UsersController()