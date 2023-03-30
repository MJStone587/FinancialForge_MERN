const Expense = require('../models/expense');
const mongoose = require('mongoose');

exports.expense_list = async function (req, res) {
  try {
    const expenseList = await Expense.find({}).sort({ dateCreated: -1 });
    res.status(200).json(expenseList);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

// Handle Receipt create on POST.
exports.expense_create = async function (req, res) {
  const { name, description, dateReceived, total, paymentType, category } =
    req.body;
  let emptyFields = [];
  if (!name) {
    emptyFields.push('name');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!dateReceived) {
    emptyFields.push('dateReceived');
  }
  if (!total) {
    emptyFields.push('total');
  }
  if (!paymentType) {
    emptyFields.push('paymentType');
  }
  if (!category) {
    emptyFields.push('category');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all required fields', emptyFields });
  }

  try {
    const expenseDuplicate = await Expense.findOne({ name: name });
    if (expenseDuplicate) {
      return res.status(400).json({
        error: 'Duplicate names found, please create Expense with new name',
        emptyFields,
      });
    }
    const expense = await Expense.create({
      name,
      description,
      category,
      total,
      dateReceived,
      paymentType,
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
    return res.status(400).json({ error: 'No income found' });
  }
  res.status(200).json(getExp);
};

exports.expense_update = async function (req, res) {
  const { id } = req.params;
  const { name, description, dateReceived, total, paymentType, category } =
    req.body;

  try {
    const expense = await Expense.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        total,
        dateReceived,
        paymentType,
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
    return res.status(400).json({ error: 'This expense does not exist' });
  }
  const expense = await Expense.findByIdAndDelete({ _id: id });

  if (!expense) {
    return res.status(400).json({ error: 'Error will robinson' });
  }
  res.status(200).json(expense);
};
