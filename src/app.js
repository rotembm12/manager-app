const express = require('express');
require('./db/mongoose');
const UserRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());
app.use(UserRouter);
app.use(taskRouter);
app.use('/uploads', express.static('uploads'));

module.exports = app;
