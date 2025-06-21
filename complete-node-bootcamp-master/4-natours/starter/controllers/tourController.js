const Tour = require('../models/tourModel')

exports.checkValidBody = (req, res, next) => {
	if (!req.body.name || !req.body.price) {
		return res.status(400).send({
			status: 'Failed',
			message: 'missing request body parameter',
		});
	}
	next();
};

exports.getAllTours = async (req, res) => {
	try {
		const tours = await Tour.find()
		res.status(200).send({
			status: 'success',
			results: tours.length,
			data: {
				tours
			},
		});
	} catch (err) {
		res.status(500).send({
			status: "failed",
			message: "failed to fetch data from db"
		})
	}
};

exports.getTourById = async (req, res) => {
	try {
		const tours = await Tour.findById(req.params.id)
		// await Tour.findOne({ _id: req.params.id })
		res.status(200).send({
			status: 'success',
			data: {
				tours
			},
		});
	} catch (err) {
		res.status(500).send({
			status: "failed",
			message: "failed to fetch data from db"
		})
	}
};

exports.createATour = async (req, res) => {
	try {
		//const newTour = new Tour({})
		// newTour.save()
		const newTour = await Tour.create(req.body);

		res.status(201).send({
			status: 'success',
			data: {
				tour: newTour,
			},
		});
	} catch (err) {
		res.status(400).send({
			status: 'failed',
			message: "Invalid data sent!"
		})
	}
};

exports.updateTourById = async (req, res) => {
	try {
		const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(201).send({
			status: 'success',
			data: {
				tour: newTour,
			},
		});
	} catch (err) {
		res.status(400).send({
			status: 'failed',
			message: "Invalid data sent!"
		})
	}
};

exports.deleteTourById = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id);
		res.status(204).send({
			status: 'success',
			message: 'Tour deleted'
		});
	} catch (err) {
		res.status(400).send({
			status: 'failed',
			message: "Invalid data sent!"
		})
	}
};
