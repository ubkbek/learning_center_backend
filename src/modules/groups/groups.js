const groupsModel = require('./model')

class GroupController{
    async POST(req, res){
        try {
            const { title, teacher_id, course_id } = req.body
            const [newGroup] = await groupsModel.addGroups(title, course_id, teacher_id)

            if(newGroup){
                res.json({
                    status: 201,
                    message: "Group has been created!",
                    data: newGroup
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    async GET(req, res){
        try {
            const groups = await groupsModel.allGroups()
            console.log('salom');
            if(groups){
                res.json(groups)
            }
        } catch (err) {
            console.log(err);
        }
    }

    async STUDENT_GROUPS(req, res){
        try {
            const student_id = req.verifyId
            const groups = await groupsModel.studentGroups(student_id)
            if(groups){
                return res.json(groups)
            }
        } catch (err) {
            console.log(err.message);
        }
    }

}

module.exports = new GroupController()