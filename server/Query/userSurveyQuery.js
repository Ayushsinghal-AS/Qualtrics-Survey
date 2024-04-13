const database = require('../database');

exports.userSurveyQuery = async ( value) => {
    const query = "SELECT * FROM user_survey_link WHERE id = ?";
    const rows = await database(query,value)
    return await rows[0];
}

exports.userSurveyUrl = async ( value) => {
    const query = 'SELECT * FROM user_survey_link WHERE id = ?';
    const rows = await database(query,value)
    return await rows[0];
}

exports.userGetlink = async ( value) => {
    const query = 'SELECT * FROM user_survey_link WHERE id = ?';
    const rows = await database(query,value)
    return await rows[0];
}

exports.qualtricsResponse = async ( value) => {
    const query = 'SELECT * FROM question_survey_response WHERE useremail = ?';
    const rows = await database(query,value)
    return await rows[0];
}

