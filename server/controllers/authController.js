const { loginQuery } = require('../Query/loginQuery');
const database = require('../database');



exports.login = async (req, res) => {
    try {
        const loginPayload = [req.body.email, req.body.password]
        const resp = await loginQuery(loginPayload)

        if(resp){
            res.status(200).send({ success: true, message: 'login sucessfully', data: resp })
        }else {
            res.status(400).send({ success: false, message: 'login failed' })
        }
    } catch (error) {
        console.log(error)
    }
};