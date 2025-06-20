const fs = require('fs')
const express = require('express');
const config = require('./config');

const port = config.port;

const app = express();

app.use(express.json());

const tourData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
    res.status(200).send({
        status: 'success',
        results: tourData.length,
        data: {
            tours: tourData
        }
    })
})

app.get('/api/v1/tours/:id', (req, res) => {
    const id = Number(req.params.id) + 1;

    if (id >= tourData.length) {
        res.status(404).send({
            status: 'failed',
            message: 'Invalid ID'
        })
    }

    const requiredTour = tourData.find(el => id === el.id);

    res.status(200).send({
        status: 'success',
        data: {
            tours: requiredTour
        }
    })
})

app.post('/api/v1/tours', (req, res) => {
    const newId = tourData[tourData.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tourData.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tourData), (err) => {
        res.status(201).send({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
})

app.patch('/api/v1/tours/:id', (req, res) => {
    const id = Number(req.params.id);

    if (id >= tourData.length) {
        res.status(404).send({
            status: 'failed',
            message: 'Invalid ID'
        })
    }

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

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(newToursData), (err) => {
        res.status(200).send({
            status: 'success',
            data: {
                tour: updatedToure
            }
        })
    })
})

app.delete('/api/v1/tours/:id', (req, res) => {
    const id = Number(req.params.id);

    if (id >= tourData.length) {
        res.status(404).send({
            status: 'failed',
            message: 'Invalid ID'
        })
    }

    const newTours = tourData.filter((el) => el.id === id);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(newTours), (err) => {
        res.status(204).send({
            status: 'success',
            message: "Tour Deleted"
        })
    })
})

app.listen(port, () => console.log(`server started at port: ${port}`))