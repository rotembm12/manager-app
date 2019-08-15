const express = require('express');
require('./db/mongoose');
const path = require('path');
const UserRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());
app.use(UserRouter);
app.use(taskRouter);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}


module.exports = app;
