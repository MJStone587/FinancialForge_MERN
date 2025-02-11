const Expense = require("../models/expense");
const Income = require("../models/income");

const paginatedResults = (model) => {
	return async (req, res, next) => {
		const page = parseInt(req.query.page) || 0;
		const limit = parseInt(req.query.limit) || 3;
		const startIndex = (page - 1) * limit;
		//const endIndex = page * limit;
		const user_id = req.user._id;

		//const results = {};
		/*
		if (endIndex > (await model.countDocuments().exec())) {
			results.next = {
				page: page + 1,
				limit: limit,
			};
		}
		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit: limit,
			};
		}*/

		try {
			const results = await model.find({ user_id }).limit(limit).skip(startIndex).exec();
			res.status(200).json(results);
			next();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};
};

module.exports = paginatedResults;
