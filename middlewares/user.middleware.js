const {ErrorHandler, errors} = require('../errors');
const {User} = require('../dataBase');

const {NOT_VALID_BODY, BAD_REQUEST_USER_REGISTERED, NOT_FOUND_BY_ID} = errors;

module.exports = {
    isUserBodyValid: (validator, isLogin) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                let message;

                if (isLogin) {
                    message = NOT_VALID_BODY.message;
                } else {
                    message = error.details[0].message;
                }

                throw new ErrorHandler(message, NOT_VALID_BODY.code);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserByEmailMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(BAD_REQUEST_USER_REGISTERED.message, BAD_REQUEST_USER_REGISTERED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(NOT_FOUND_BY_ID.message, NOT_FOUND_BY_ID.code);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
}
