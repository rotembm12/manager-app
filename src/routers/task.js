const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

//create new task -> save to db -> send the newly created task
router.post('/api/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e.toString());
    }
});

//get tasks -> also able to get tasks that match my query (query sits in req.query object)
router.get('/api/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'; //query value is string and completed property is boolean in the DB
    }
    if (req.query.sortBy) {
        //the request will be like -> fetch('/api/tasks?sortBy=createdAt:desc',...)
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    try {
        await req.user
            .populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            })
            .execPopulate(); //same as -> const tasks = await Task.find({owner: res.user._id});
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});
router.get('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id
        });
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/api/tasks/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, {
            ...req.body
        });
        const savedUpdatedTask = await updatedTask.save();
        res.send(savedUpdatedTask);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

router.delete('/api/tasks/:id', auth, async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id
        });
        if (!deletedTask) {
            return res.status(404).send();
        }
        res.send(deletedTask);
    } catch (e) {
        res.status(500).send(e);
    }
});
module.exports = router;
