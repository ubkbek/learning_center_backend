const { verify, JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken')
const courseModel = require('../modules/courses/model')

class Middlewares{
    async verify(req, res, next){
        const { access_token } = req.headers

        if(!access_token){
            return res.redirect('/')
        }

        verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err instanceof JsonWebTokenError){
                return res.json('Invalid token')
            }

            if(err instanceof TokenExpiredError){
                return res.json("Token expired")
            }

            res.verifyId = decoded.id

            next()
        }

          );
    }

    async coursePost(req, res, next){
        const { title, price } = req.body
        const [course] = await courseModel.verifyCourse(title)
        if(course){
            return res.json({
                status: 501,
                message: "Course already exists"
            })
        }
        next()
    }
}

module.exports = new Middlewares()