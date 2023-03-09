const Income = require('../models/income');
const mongoose = require('mongoose');

exports.get_all_income = async function (req, res) {
  try {
    const incomeData = await Income.find({}).sort({ date: -1 });
    res.status(200).json(incomeData);
  } catch (error) {
    res.status(400).json({ error: 'ERRRORRRRRR' });
  }
};

//get a single income
exports.get_single_income = async (req, res) => {
  const { id } = req.params;
  const income = await Income.findById(id);
  if (!income) {
    return res.status(404).json({ error: 'No income found' });
  }
  res.status(200).json(income);
};

// Create new income .
exports.income_create_post = async (req, res) => {
  const { name, description, from, date, total } = req.body;
  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!from) {
    emptyFields.push('from');
  }
  if (!date) {
    emptyFields.push('date');
  }
  if (!total) {
    emptyFields.push('total');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: 'Please fill in all fields! ',
      emptyFields,
    });
  }
  const incomeDuplicate = await Income.findOne({ name: name });

  if (incomeDuplicate) {
    return res.status(400).json({
      error: 'Duplicate data found, please create new Income with new name',
      emptyFields,
    });
  }

  try {
    const income = await Income.create({
      name,
      description,
      from,
      date,
      total,
    });
    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Display Author delete form on GET.

exports.income_delete = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'This income does not exist' });
  }
  const income = await Income.findByIdAndDelete({ _id: id });

  if (!income) {
    return res.status(400).json({ error: 'No income found' });
  }
  res.status(200).json(income);
};

exports.income_update = async (req, res) => {
  const { id } = req.params;
  const { name, description, from, date, total } = req.body;

  try {
    const income = await Income.findByIdAndUpdate(id, {
      name,
      description,
      from,
      date,
      total,
    });
    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
