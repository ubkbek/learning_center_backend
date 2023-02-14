const model = require('./model')
const sign = require('../../utils/jwt.js')

class LoginController {
    async LOGIN(req, res){
        try {
            const { name, password } = req.body

            const [user] = await model.getUsers(name, password)

            if(!user){
                return res.json({
                    status: 404,
                    message: 'User not found'
                })
            }

                res.json({
                    message: 'authorized',
                    access_token: sign({id: user.user_id}, process.env.SECRET_KEY),
                    role: user.user_status == 3 ? '/admin' : user.user_status == 2 ? '/teacher' : user.user_status == 1 ? '/student' : '/login'
                    // role: user.user_status == 3 ? '/admin' : user.user_status == 2 ? '/teacher' : '/student'
                })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new LoginController()
