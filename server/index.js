const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');


app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/loginRoutes');
const userSurveyRoutes = require('./routes/userSurveyRoutes');


const port = process.env.PORT || 8080;

app.use('/auth', authRoutes);
app.use('/survey', userSurveyRoutes);

 
app.listen(port,() => {
    console.log('Server is running at port : ' + port);
});
