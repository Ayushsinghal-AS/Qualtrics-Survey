const database = require('../database');

exports.loginQuery = async ( value) => {
    const query = "SELECT * FROM user_login WHERE email = ? AND password = ?";
    const resp = await database(query,value)
    return await resp[0];
}