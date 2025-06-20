const fs = require('fs')

const tourData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkId = (req, res, next, val) => {
    if (val >= tourData.length) {
        return res.status(404).send({
            status: 'failed',
            message: 'Invalid ID'
        })
    }
    next()
}

exports.checkValidBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({
            status: 'Failed',
            message: 'missing request body parameter'
        })
    }
    next()
}

exports.getAllTours = (req, res) => {
    res.status(200).send({
        status: 'success',
        results: tourData.length,
        data: {
            tours: tourData
        }
    })
}

exports.getTourById = (req, res) => {
    const id = Number(req.params.id) + 1;

    const requiredTour = tourData.find(el => id === el.id);

    res.status(200).send({
        status: 'success',
        data: {
            tours: requiredTour
        }
    })
}

exports.createATour = (req, res) => {
    const newId = tourData[tourData.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tourData.push(newTour);

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tourData), (err) => {
        res.status(201).send({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

exports.updateTourById = (req, res) => {
    const id = Number(req.params.id);

    let updatedToure = {};

    const newToursData = tourData.map((el) => {
        if (el.id === id) {
            updatedToure = Object.assign({
                ...el,
                ...req.body
            })
            return {
                ...el,
                ...req.body
            }
        } else {
            return el;
        }
    })

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(newToursData), (err) => {
        res.status(200).send({
            status: 'success',
            data: {
                tour: updatedToure
            }
        })
    })
}

exports.deleteTourById = (req, res) => {
    const id = Number(req.params.id);

    const newTours = tourData.filter((el) => el.id !== id);

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(newTours), (err) => {
        res.status(204).send({
            status: 'success',
            message: "Tour Deleted"
        })
    })
}