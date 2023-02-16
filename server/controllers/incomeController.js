const Income = require('../models/income');
const { body, validationResult } = require('express-validator');

exports.get_all_income = async function (req, res) {
  try {
    let incomeData = await Income.find({}).sort({ date: -1 });
    res.status(200).json(incomeData);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//get a single income

exports.get_income = async (req, res) => {
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
  try {
    const income = await Income.create({
      name,
      description,
      from,
      date,
      amount,
    });
    res.status(200).json(income);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

exports.income_detail = function (req, res) {
  if (req.session.isAuth) {
    Income.findById(req.params.id, function (err, results) {
      if (err) {
        return next(err);
      } else {
        res.render('income_detail', {
          title: 'Income Details',
          results: results,
          authCheck: req.session.isAuth,
          authorID: req.session.authUserID,
          authUser: req.session.authUser,
        });
      }
    });
  } else {
    Income.findById(req.params.id, function (err, results) {
      if (err) {
        return next(err);
      } else {
        res.render('income_detail', {
          title: 'Income Details',
          results: results,
          authCheck: req.session.isAuth,
        });
      }
    });
  }
};
// Display Author delete form on GET.
exports.income_delete_get = function (req, res, next) {
  if (req.session.isAuth) {
    Income.findById(req.params.id, function (err, results) {
      if (err) {
        return next(err);
      } else {
        res.render('income_delete', {
          title: 'Income Deletion',
          results: results,
        });
      }
    });
  } else {
    res.redirect('/catalog/user/login');
  }
};

exports.income_delete_post = function (req, res) {
  Income.findByIdAndRemove(req.body.incomeid, function deleteIncome(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/catalog/incomes');
  });
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
