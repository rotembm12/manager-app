const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const router = new express.Router();

const fileFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        return cb(new Error('Only .png/jpg/jpeg is allowed'));
    }
    cb(undefined, true);
};

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 3 //1024*1024 is 1 megabyte
    },
    fileFilter
});

//get user profile. CONTINUE AFTER CLIENT
router.get('/api/users', auth, async (req, res) => {
    res.send(req.user);
});

//user login  CONTINUTE AFTER CLIENT
router.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

//create new user
router.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json({ user });
    } catch (e) {
        res.status(400).send();
    }
});

//delete user
router.delete('/api/users', auth, async (req, res) => {
    try {
        const userToRemove = req.user;
        const removedUser = await userToRemove.remove();
        res.send({
            message: `Removed user: ${removedUser.email}`,
            user: removedUser
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

//delete all users
router.delete('/api/users/deleteAll', async (req, res) => {
    try {
        await User.remove({});
        res.send({ message: 'removed all User documents' });
    } catch (e) {
        res.send(e);
    }
});

//update user details (found by mail)
router.patch('/api/users/me', async (req, res) => {
    //get the updates via req.body.updates.email/password/name/...
    const updates = Object.keys(req.body.updates);
    try {
        const user = await User.findOne({ email: req.body.email });
        updates.forEach(update => {
            user[update] = req.body.updates[update];
        });
        const updatedUser = await user.save();
        res.send(updatedUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

//upload avatar to user
router.post(
    '/api/users/me/avatar',
    auth,
    upload.single('avatar'),
    async (req, res) => {
        const buffer = await sharp(req.file.buffer)
            .resize({ width: 250, height: 250 })
            .png()
            .toBuffer();
        req.user.avatar = buffer;
        const savedUser = await req.user.save();
        res.json(savedUser);
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

router.delete('/api/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = '';
        await req.user.save();
        res.send({ message: 'avatar deleted' });
    } catch (e) {
        res.status(500).send({ error: e.toString() });
    }
});

router.get('/api/users/:id/avatar/:any', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        if (user.avatar.toString() === '') {
            throw new Error();
        }

        res.send({ avatar: user.avatar.toString('base64') });
    } catch (e) {
        res.status(404).send({ error: e.toString() });
    }
});

module.exports = router;
