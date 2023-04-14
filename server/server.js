const express = require('express');
const bodyParser = require('body-parser');
const tasks = require('./routes/tasks.router')
const app = express();

app.use(bodyParser.urlencoded({encoded: true}));
app.use('/tasks', tasks);
app.use(express.static('server/public'));

const PORT = 3000;
app.listen(PORT, () => {console.log('Connect at port: ', PORT)});

