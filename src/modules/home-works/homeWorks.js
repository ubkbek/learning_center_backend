const homeWorkModel = require('./model')

class HomeWorkController{
    async POST(req, res){
        try {
            const { title, content, group_id } = req.body
            console.log(title, content, group_id);
            const [homework] = await homeWorkModel.addHomeWork(title, content, group_id)
            if(homework){
                res.json({
                    status: 200,
                    message: "Homework has been created",
                    data: homework
                })
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    async GROUP_HOMEWORKS(req, res){
        try {
            const {group_id} = req.params
            const homeworks = await homeWorkModel.groupHomeworks(group_id)
            if(homeworks.length > 0){
                return res.json(homeworks)
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = new HomeWorkController()