const groupModel = require('../modules/groups/model')

class GroupMiddlewares{
    async verify(req, res, next){
        try {
            const { title, course_id, teacher_id } = req.body

            const [group] = await groupModel.verifyGroups(title, course_id, teacher_id)

            if(group){
                return res.json('allaqachon mavjud')
            }

            next()
        } catch (err) {
            console.log(err);
        }

    }
}

module.exports = new GroupMiddlewares()