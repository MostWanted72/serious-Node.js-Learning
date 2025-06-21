const express = require('express')
const tourController = require('../controllers/tourController')

const router = express.Router()

// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createATour)
// app.get('/api/v1/tours/:id', getTourById)
// app.patch('/api/v1/tours/:id', updateTourById)
// app.delete('/api/v1/tours/:id', deleteTourById)

// router.param('id', tourController.checkId)

router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.createATour)
    // .post(tourController.checkValidBody, tourController.createATour)

router.route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.updateTourById)
    .delete(tourController.deleteTourById)

module.exports = router;