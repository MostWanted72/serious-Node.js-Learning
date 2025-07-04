const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router()

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createAUser)

router.route('/:id')
    .get(userController.getUserById)
    .patch(userController.updateUserById)
    .delete(userController.deleteUserById)

module.exports = router;