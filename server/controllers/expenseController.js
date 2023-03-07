const Expense = require('../models/expense');
const { body, validationResult } = require('express-validator');

exports.expense_list = async function (req, res) {
  try {
    const expenseList = await Expense.find({}).sort({ date: -1 });
    res.status(200).json(expenseList);
  } catch (error) {
    res.status(400).json({ error: 'No data found' });
  }
};

// Handle Receipt create on POST.
exports.expense_create = async function (req, res) {
  const { name, description, ccName, date, total, paymentType, category } =
    req.body;
  let emptyFields = [];
  if (!name) {
    emptyFields.push('name');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!date) {
    emptyFields.push('date');
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
      .json({ error: 'Please fill in all required fields' });
  }

  try {
    const expense = await Expense.create({
      name,
      description,
      category,
      total,
      date,
      ccName,
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
