    const PG = require('../../utils/postgres')

class LoginModel extends PG{
    async getUsers(name, password){
        return await this.fetch('SELECT * FROM users WHERE user_name = $1 AND user_password = $2', name, password)
    }
}

module.exports = new LoginModel()