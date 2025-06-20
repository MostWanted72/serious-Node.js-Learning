const express = require('express');

const router = express.Router()

const getAllUsers = (req, res) => {
    res.status(500).send({
        status: 'error',
        message: 'This route is under development'
    })
}

const createAUser = (req, res) => {
    res.status(500).send({
        status: 'error',
        message: 'This route is under development'
    })
}

const getUserById = (req, res) => {
    res.status(500).send({
        status: 'error',
        message: 'This route is under development'
    })
}

const updateUserById = (req, res) => {
    res.status(500).send({
        status: 'error',
        message: 'This route is under development'
    })
}

const deleteUserById = (req, res) => {
    res.status(500).send({
        status: 'error',
        message: 'This route is under development'
    })
}

router.route('/')
    .get(getAllUsers)
    .post(createAUser)

router.route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

module.exports = router;