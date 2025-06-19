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
    const requiredTour = tourData.find(el => id === el.id);

    if (id >= tourData.length) {
        res.status(500).send({
            status: 'not found',
        })
    }

    res.status(200).send({
        status: 'success',
        data: {
            tours: requiredTour
        }
    })
})

app.post('/api/v1/tours', (req, res) => {
    const newId = tourData[tourData.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body );

    tourData.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tourData), (err) => {
        res.send({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
})

app.listen(port, () => console.log(`server started at port: ${port}`))