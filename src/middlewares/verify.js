const { verify, JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken')

class Verify{
    verify_token(req, res, next){
        const { access_token } = req.headers

        if(!access_token){
            return res.redirect('/')
        }

        verify(access_token, process.env.SECRET_KEY, (err, decoded) => {
            if(err instanceof JsonWebTokenError){
                return res.json('Invalid token')
            }

            if(err instanceof TokenExpiredError){
                return res.json("Token expired")
            }

            req.verifyId = decoded.id

            next()
        }

          );
    }

    // verifyAccess(res, res, next){
    //     try {
    //         const id = req.verifyId
    //         if(!id){
    //             return window.location.href = '/'
    //         }
    //         next()
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }
}

module.exports = new Verify()