const { userSurveyQuery, userSurveyUrl, userGetlink, qualtricsResponse } = require('../Query/userSurveyQuery');
const database = require('../database');
const axios = require('axios');



exports.userSurveyEMD = async (req, res) => {
    try {
        const { id } = req.params;
        const surveyBody = [id];
        const resp = await userSurveyQuery(surveyBody);

        if (!resp) {
            return res.status(400).send({ success: false, message: 'User not found' });
        } else {

            const obj = {
                surveyId: resp.survey_id,
                linkType: "Individual",
                description: "distribution 2019-06-24 00:00:00",
                action: "CreateDistribution",
                expirationDate: "2024-09-13T06:00:00Z",
                mailingListId: resp.mailing_id,
            };

            const { data, status } = await axios.post('https://yul1.qualtrics.com/API/v3/distributions', obj, {
                headers: {
                    'X-API-TOKEN': process.env.QUALTRICS_API_KEY
                }
            });
            const updateQuery = 'UPDATE user_survey_link SET userEMD_id = ? WHERE id = ?';
            const updateResult = await database(updateQuery,[data.result.id, id]);

            if (updateResult.affectedRows > 0) {
                return res.status(200).send({ success: true, message: 'Survey ID created successfully', data: updateResult });
            } else {
                return res.status(500).send({ success: false, message: 'Failed to update user with survey ID' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: error });
    }
};

exports.userSurveyLink = async (req, res) => {
    try {
        const { id } = req.params;
        const surveyBody = [id];
        const rows = await userSurveyUrl(surveyBody);
        

        if (!rows || rows.length < 1) {
            return res.status(400).send({ success: false, message: 'User not found' });
        } else {
            const obj = {
                id: rows[0].userEMD_id
            };

            const { data, status } = await axios.get(`https://co1.qualtrics.com/API/v3/distributions/${obj.id}/links?surveyId=SV_9pEevqh1NQhZq2a`, {
                headers: {
                    'X-API-TOKEN': process.env.QUALTRICS_API_KEY
                }
            });

            const { link, email, firstName, lastName } = data.result.elements[0];
          
            const querySurveyUrl = `UPDATE user_survey_link SET userSurveyUrl = ?,  email = ?, firstName = ?, lastName = ? WHERE id = ?`;
            const value = [link, email, firstName, lastName, id];
            const surveyUrl = await database(querySurveyUrl, value);

            if (surveyUrl.affectedRows > 0) {
                const getQuery = `SELECT * FROM user_survey_link WHERE id = ?`;
                const getData = await database(getQuery, [id]);
                return res.status(200).send({ success: true, message: 'Survey URL link created successfully', data: getData });
            } else {
                return res.status(500).send({ success: false, message: 'Failed to update user with survey URL' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: error });
    }
};

exports.getLink = async (req, res) => {
    try {
        const { id } = req.params;
        const surveyBody = [id];
        const rows = await userGetlink(surveyBody);
        
        if (!rows) {
            return res.status(400).send({ success: false, message: 'User not found' });
        } else {

            const survey_link = rows.userSurveyUrl;

            if (survey_link) {
                return res.status(200).send({ success: true, message: 'Survey URL link provided successfully', data: survey_link });
            } else {
                return res.status(500).send({ success: false, message: 'Failed to update user with survey URL' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: error });
    }
};

exports.progressId = async (req, res) => {
    try {
        const { id } = req.params;
        const surveyBody = [id];
        const rows = await userGetlink(surveyBody);
        
        if(!rows){
        return res.status(400).send({ success: false, message: 'User not found' });
    }else {
        const survey = {
            surveyId: rows.survey_id
        }
        const obj = {
            format: "json",
            compress: "false"
        }
        const {data,status}  = await axios.post(`https://az1.qualtrics.com/API/v3/surveys/${survey.surveyId}/export-responses`,obj, {
            headers: {
                'X-API-TOKEN': process.env.QUALTRICS_API_KEY
            }
        });
        return res.status(200).send({ success: true, message: 'survey Id creted sucessfully', data: data.result.progressId });
    }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: error });
    }
};

exports.fileId = async (req, res) => {
    try {
        const { id } = req.params;
        const surveyBody = [id];
        const rows = await userGetlink(surveyBody);

        if(!rows){
        return res.status(400).send({ success: false, message: 'User not found' });
    }else {
        const survey = {
            surveyId: rows.survey_id,
            exportProgressId: "ES_1Ui8yPTHyVqjxga"
        }
       
    const {data,status}  = await axios.get(`https://az1.qualtrics.com/API/v3/surveys/${survey.surveyId}/export-responses/${survey.exportProgressId}`, {
            headers: {
                'X-API-TOKEN': process.env.QUALTRICS_API_KEY
            }
        });
        return res.status(200).send({ success: true, message: 'survey Id creted sucessfully', data: data.result.fileId });
    }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: error });
    }
};

exports.response = async (req, res) => {
    try {
        const { id } = req.params;
        const surveyBody = [id];
        const rows = await userGetlink(surveyBody);

        if(!rows){
        return res.status(400).send({ success: false, message: 'User not found' });
    }else {
        const survey = {
            surveyId: rows.survey_id,
            fileId: "692973a6-f9d1-4734-9743-01d6e7fe8454-def"
        }
       
    const {data,status}  = await axios.get(`https://az1.qualtrics.com/API/v3/surveys/${survey.surveyId}/export-responses/${survey.fileId}/file`, {
            headers: {
                'X-API-TOKEN': process.env.QUALTRICS_API_KEY,
            }
        });
        return res.status(200).send({ success: true, message: 'survey Id creted sucessfully', data: data });
    }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: error });
    }
};

exports.qualtricsResponse = async (req, res) => {
    try {
        const data = req.query;
        const { id } = req.params;
        const surveyBody = [id];
        const rows = await userGetlink(surveyBody);

        if(!rows){
            return res.status(404).send({ success: false, message: 'User not found' });
        }else {
            
            const columns = [];
            const values = [];
            let len = data.length-1;
            for (let i = 1; i <= len; i++) {
                const questionName = `Q${i}`;
                const questionIdName = `${i}`;
                const columnName = `QAns${i}`;
                const valueName = `Q${i}`;

                columns.push(questionName);
                values.push(questionIdName);
                columns.push(columnName);
                values.push(data[valueName]);
            };

            columns.unshift('useremail');
            values.unshift(`${data.email}`);

            const columnsString = columns.join(', ');
            const valuesString = values.map(value => `'${value}'`).join(', ');

            const insertQuery = `INSERT INTO question_survey_response (${columnsString}) VALUES (${valuesString})`;
            const resultInsert = await database(insertQuery, '');
            console.log("updateResult",resultInsert);
            return res.status(200).send();
        }
    
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: error });
    }
};

exports.getResponse = async (req, res) => {
    try {
        const { email } = req.params;
        const surveyBody = [email];
        const rows = await qualtricsResponse(surveyBody);
    
        if (!rows) {
            return res.status(400).send({ success: false, message: 'User not found' });
        } else {
            const result1 = rows;
            
            const result1Array = Object.keys(result1).map((key) => {
                if (key.startsWith('QAns')) {
                  return {
                    [key]: result1[key],
                  };
                } else {
                  return null;
                }
              }).filter(Boolean);

            const result = `SELECT * FROM qualtrics_survey.question_north_star as sub
            inner join qualtrics_survey.survey_paragraph_question as pa on sub.Questions = pa.id`;
            const resultInsert = await database(result, '');

            let len = resultInsert.length;
            let len2 = result1Array.length;
    
            if (len === len2) {
                const mappedResultInsert = resultInsert.map((questionObj, index) => {
                    return {...questionObj, QAns: result1Array[index][`QAns${index+1}`]};
                });
    
    console.log("mappedResultInsert",mappedResultInsert);
                if (mappedResultInsert) {
                    return res.status(200).send({ success: true, message: 'Survey URL link provided successfully', data: mappedResultInsert});
                } else {
                    return res.status(500).send({ success: false, message: 'Failed to update user with survey URL' });
                }
            } else {
                return res.status(500).send({ success: false, message: 'Length mismatch between resultInsert and result1' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Internal server error' });
    }
};