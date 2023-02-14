const usersModel = require('../modules/users/model')

class userMiddlewares{
    async addTeacher(req, res, next){
        try {
            const { name, password, phone, course } = req.body
            const [teacher] = await usersModel.verifyTeacher(name, password, phone, course)
            if(teacher){
                return res.json({
                    status: 501,
                    message: "This teacher already exist"
                })
            }

            next()
        } catch (err) {
            console.log(err.message);
        }
    }

    async addStudent(req, res, next){
        try {
            const {name, password} = req.body
            const [student] = await usersModel.verifyStudent(name, password)
            if(student){
                return res.json({
                    status: 501,
                    message: "Student already exists"
                })
            }

            next()
        } catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = new userMiddlewares()