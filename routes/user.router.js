const router = require('express')
    .Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');
const {userValidator} = require('../validators');

const {createUserValidator, updateUserValidator} = userValidator;

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isUserBodyValid(createUserValidator),
    userMiddleware.checkUserByEmailMiddleware,
    userController.createUser
);

router.get(
    '/:user_id',
    userMiddleware.checkUserById,
    userController.getUserById
);
router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(updateUserValidator),
    userMiddleware.checkUserById,
    userController.updateUser
);
router.delete(
    '/:user_id',
    userMiddleware.checkUserById,
    userController.deleteUser
);

module.exports = router;
