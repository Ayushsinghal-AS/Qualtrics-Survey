let express = require('express');
const { userSurveyEMD, userSurveyLink, getLink, progressId, fileId, response, qualtricsResponse, getResponse } = require('../controllers/userSurveyController.js');

let route = express.Router();

route.post('/surveyEMD/:id',userSurveyEMD);
route.get('/surveyLink/:id',userSurveyLink);
route.get('/getlink/:id',getLink);
route.post('/progressId/:id',progressId);
route.get('/fileId/:id',fileId);
route.get('/response/:id',response);
route.get('/qualtricsResponse/:id',qualtricsResponse);
route.get('/getResult/:email',getResponse);









module.exports = route;
