const StudentGroupModel = require('./model')

class StudentGroupController{
    async POST_STUDENT_GROUP(req, res){
        try {
            const { student_id, group_id } = req.body
            const [data] = await StudentGroupModel.addStudentGroups(student_id, group_id)
        if(data){
            res.json('ok')
        }
        } catch (err) {
            console.log(err.message);
        }
    }
}


module.exports = new StudentGroupController()