const Income = require('../models/income');
const mongoose = require('mongoose');

exports.get_all_income = async function (req, res) {
  try {
    const incomeData = await Income.find({}).sort({ date: -1 });
    res.status(200).json(incomeData);
  } catch (error) {
    res.status(404).json({ msg: 'Error MotherFucka! Do you speak it!?' });
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
  const { name, description, from, date, amount } = req.body;
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
  if (!amount) {
    emptyFields.push('amount');
  }
  if (emptyFields.length > 0) {
    res.status(400).json({
      error: 'Please fill in all fields! ',
      emptyFields,
    });
  }
  try {
    const income = await Income.create({
      name,
      description,
      from,
      date,
      amount,
    });
    res.status(200).json(income);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
// Display Author delete form on GET.
exports.income_delete_get = function (req, res, next) {};

exports.income_delete_post = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'This income does not exist' });
  }
  const income = await Income.findByIdAndDelete({ _id: id });

  if (!income) {
    return res.status(404).json({ error: 'No income found' });
  }
  res.status(200).json(income);
};

exports.income_update_get = function (req, res, next) {
  if (req.session.isAuth) {
    Income.findById(req.params.id, function (err, results) {
      if (err) {
        return next(err);
      } else {
        res.render('income_update', {
          title: 'Income Update',
          results: results,
          authCheck: req.session.isAuth,
          authorID: req.session.authUserID,
          authUser: req.session.authUser,
        });
      }
    });
  } else {
    res.redirect('/catalog/user/login');
  }
};

exports.income_update_post = function (req, res, next) {
  var income = new Income({
    name: req.body.name,
    description: req.body.description,
    from: req.body.from,
    date: req.body.date,
    amount: req.body.amount,
    _id: req.params.id, //This is required, or a new ID will be assigned!
  });
  Income.findByIdAndUpdate(req.params.id, income, function (err) {
    if (err) {
      return next(err);
    } else {
      res.redirect('/catalog/incomes');
    }
  });
};
