const Income = require('../models/income');
const mongoose = require('mongoose');

exports.get_all_income = async function (req, res) {
  const user_id = req.user._id;
  try {
    const incomeData = await Income.find({ user_id }).sort({ dateCreated: -1 });
    res.status(200).json(incomeData);
  } catch (error) {
    res.status(400).json({ error: 'Error: please contact support!' });
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
  const { name, description, category, dateReceived, total } = req.body;
  let totalF = parseFloat(total).toFixed(2);
  let emptyFields = [];
  if (!name) {
    emptyFields.push('name');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!category) {
    emptyFields.push('category');
  }
  if (!dateReceived) {
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

  if (total < 0) {
    return res
      .status(400)
      .json({ error: 'Total cannot be less than 0', emptyFields });
  }

  try {
    const incomeDuplicate = await Income.findOne({ name: name });
    if (incomeDuplicate) {
      return res.status(400).json({
        error: 'Duplicate names found, please create Income with new name',
        emptyFields,
      });
    }
    const user_id = req.user._id;
    const income = await Income.create({
      name,
      description,
      category,
      dateReceived,
      user_id,
      total: totalF,
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
  const { name, description, category, dateReceived, total } = req.body;
  let totalF = parseFloat(total).toFixed(2);
  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!category) {
    emptyFields.push('category');
  }
  if (!dateReceived) {
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

  if (total < 0) {
    return res
      .status(400)
      .json({ error: 'Total cannot be less than 0', emptyFields });
  }

  try {
    const user_id = req.user._id;
    const income = await Income.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        dateReceived,
        total: totalF,
        user_id,
      },
      { new: true }
    );
    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
