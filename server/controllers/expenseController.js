const Expense = require("../models/expense");
const mongoose = require("mongoose");

exports.expense_list = async function (req, res) {
	var page = parseInt(req.query.currentPage - 1) || 0;
	const docsPerPage = parseInt(req.query.docsPerPage) || 9;
	const startIndex = (page - 1) * docsPerPage;
	const endIndex = page * docsPerPage;
	const user_id = req.user._id;

	console.log("docsPerPage: ", docsPerPage, "page: ", page);

	if (endIndex > (await Expense.countDocuments({ user_id }).exec())) {
		page += 1;
	}

	if (startIndex > 0) {
		page -= 1;
	}

	try {
		const expenseList = await Expense.find({ user_id })
			.sort({
				dateCreated: "ascending",
			})
			.limit(docsPerPage)
			.skip(endIndex)
			.exec();
		const docTotal = await Expense.countDocuments({ user_id }).exec();
		res.status(200).json({ expenseList: expenseList, docTotal: docTotal });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Create new Expense
exports.expense_create = async function (req, res) {
	const { name, description, dateReceived, total, paymentType, category } = req.body;
	let totalF = parseFloat(total).toFixed(2);
	let emptyFields = [];
	if (!name) {
		emptyFields.push("name");
	}
	if (!description) {
		emptyFields.push("description");
	}
	if (!dateReceived) {
		emptyFields.push("dateReceived");
	}
	if (!total) {
		emptyFields.push("total");
	}
	if (!paymentType) {
		emptyFields.push("paymentType");
	}
	if (!category) {
		emptyFields.push("category");
	}
	if (emptyFields.length > 0) {
		return res.status(400).json({ error: "Please fill in all required fields", emptyFields });
	}

	if (total < 0) {
		return res.status(400).json({ error: "Total cannot be less than 0", emptyFields });
	}

	try {
		const expenseDuplicate = await Expense.findOne({ name: name });
		if (expenseDuplicate) {
			return res.status(400).json({
				error: "Duplicate names found, please create Expense with new name",
				emptyFields,
			});
		}
		const user_id = req.user._id;
		const expense = await Expense.create({
			name,
			description,
			category,
			total: totalF,
			dateReceived,
			paymentType,
			user_id,
		});
		res.status(200).json(expense);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.expense_detail = async function (req, res) {
	const { id } = req.params;
	const getExp = await Expense.findById(id);
	if (!income) {
		return res.status(400).json({ error: "No income found" });
	}
	res.status(200).json(getExp);
};

exports.expense_update = async function (req, res) {
	const { id } = req.params;
	const { name, description, dateReceived, total, paymentType, category } = req.body;
	let totalF = parseFloat(total).toFixed(2);
	let emptyFields = [];
	if (!name) {
		emptyFields.push("name");
	}
	if (!description) {
		emptyFields.push("description");
	}
	if (!dateReceived) {
		emptyFields.push("dateReceived");
	}
	if (!total) {
		emptyFields.push("total");
	}
	if (!paymentType) {
		emptyFields.push("paymentType");
	}
	if (!category) {
		emptyFields.push("category");
	}
	if (emptyFields.length > 0) {
		return res.status(400).json({ error: "Please fill in all required fields", emptyFields });
	}
	if (total < 0) {
		return res.status(400).json({ error: "Total cannot be less than 0", emptyFields });
	}

	try {
		const user_id = req.user._id;
		const expense = await Expense.findByIdAndUpdate(
			id,
			{
				name,
				description,
				category,
				total: totalF,
				dateReceived,
				paymentType,
				user_id,
			},
			{ new: true }
		);
		res.status(200).json(expense);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.expense_delete = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "This expense does not exist" });
	}
	const expense = await Expense.findByIdAndDelete({ _id: id });

	if (!expense) {
		return res.status(400).json({ error: "Error will robinson" });
	}
	res.status(200).json(expense);
};
