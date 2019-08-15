const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('email is invalid');
                }
            }
        },
        avatar: {
            type: Buffer
        },
        birthDate: {
            type: Date,
            default: 0
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ],
        avatar: {
            type: Buffer,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

//creates a property called tasks that will be import from task documents
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

//Creates new token for validating user.
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET
    );
    user.tokens = [...user.tokens, { token }];
    await user.save();
    return token;
};

//make sure the response to the client dont include pass,tokens and avatar
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

//find user in DB to approve login
userSchema.statics.findByCredentials = async (email, password) => {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        throw new Error({ error: 'Unable to login' });
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        throw new Error({ error: 'Unable to connect' });
    }
    return foundUser;
};

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.pre('remove', async function(next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
