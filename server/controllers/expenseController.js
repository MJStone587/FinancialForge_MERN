const Expense = require('../models/expense');
const { body, validationResult } = require('express-validator');

exports.expense_list = async function (req, res) {
  const expenseList = await Receipt.find({}).sort({ date: -1 });
  res.status(200).json(expenseList);
};

// Handle Receipt create on POST.
exports.expense_create = async function (req, res) {
  //stuff goes here
};
exports.expense_detail = async function (req, res) {
  const { id } = req.params;
  const getExp = await Expense.findById(id);
  if (!income) {
    return res.status(400).json({ error: 'No income found' });
  }
  res.status(200).json(getExp);
};
// delete expense
exports.expense_delete = function (req, res, next) {};

exports.receipt_delete_post = function (req, res) {
  Receipt.findByIdAndRemove(req.body.receiptid, function deleteReceipt(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/catalog/receipts');
  });
};

exports.receipt_update_get = function (req, res, next) {
  if (req.session.isAuth) {
    Receipt.findById(req.params.id, function (err, results) {
      if (err) {
        return next(err);
      } else {
        res.render('receipt_update', {
          title: 'Receipt Update',
          results: results,
          authCheck: req.session.isAuth,
          authUser: req.session.authUser,
          authorID: req.session.authUserID,
        });
      }
    });
  } else {
    res.redirect('/catalog/user/login');
  }
};

exports.receipt_update_post = function (req, res, next) {
  var receipt = new Receipt({
    name: req.body.name,
    description: req.body.description,
    paymentType: req.body.paymentType,
    ccName: req.body.ccName,
    date: req.body.date,
    total: req.body.total,
    _id: req.params.id, //This is required, or a new ID will be assigned!
  });
  Receipt.findByIdAndUpdate(req.params.id, receipt, function (err) {
    if (err) {
      return next(err);
    } else {
      res.redirect('/catalog/receipts');
    }
  });
};
