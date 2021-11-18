const {userService, emailService} = require('../service');
const {User} = require('../dataBase');
const {emailActions} = require('../configs');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

            const normalizedUsers = [];

            users.forEach((user, index) => {
                normalizedUsers[index] = user.normaliseUser();
            });

            res.json(normalizedUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const normalizedUser = req.user.normaliseUser();

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            let newUser = await User.createUserWithHashPassword(user);

            await emailService.sendMail(user.email, emailActions.WELCOME, {userName: user.first_name});

            const normalizedUser = newUser.normaliseUser();

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findByIdAndUpdate(user_id, req.body, {new: true});

            await emailService.sendMail(user.email, emailActions.UPDATE, {userName: user.first_name});

            const normalizedUser = user.normaliseUser();

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            await emailService.sendMail(user.email, emailActions.GOODBYE, {userName: user.first_name});

            await User.deleteOne(user);

            res.json('User is deleted!');
        } catch (e) {
            next(e);
        }
    }
}

