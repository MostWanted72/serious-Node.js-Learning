const Tour = require('../models/tourModel')

exports.aliasTopToures = (req, res, next) => {
	req.query = { ...req.query, 
		limit: 5,
		sort: "ratingsAverage,-price",
		fields: "name,price,difficulty,ratingsAverage,duration,summary"
	}
	next()
}

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
		const queryObj = {...req.query};
		const excludeFields = ['page', 'sort', 'limit', 'fields']
		excludeFields.forEach(el => delete queryObj[el]);
		
		// advance querying
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

		let query = Tour.find(JSON.parse(queryStr))

		// sorting
		if (req.query.sort) {
			const querySort = req.query.sort.split(',').join(' ')
			query = query.sort(querySort)
		} else {
			query = query.sort('-createAt')
		}

		// field limiting
		if (req.query.fields) {
			const queryField = req.query.fields.split(',').join(' ');
			console.log(queryField)
			query = query.select(queryField)
		} else {
			query = query.select('-__v')
		}

		// pagination
		const page = req.query.page * 1 || 1;
		const limit = req.query.limit * 1 || 10;
		const skip = (page - 1) * limit;
		query = query.skip(skip).limit(limit);

		if (req.query.page) {
			const countTours = await Tour.countDocuments();
			if (skip >= countTours) {
				throw new Error("The page does not exist")
			}
		}

		const tours = await query

		// const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')
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
			message: err.message
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
			message: err
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
