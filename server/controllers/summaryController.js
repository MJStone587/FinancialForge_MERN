const Income = require('../models/income');
const Receipt = require('../models/receipt');

exports.summary_expense = async function (req, res) {
  try {
    const expenseData = await Receipt.find({ author: req.session.authUserID });
    res.status(200).json(expenseData);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

exports.summary_income = async function (req, res) {
  try {
    const incomeData = await Income.find({ author: req.session.authUserID });
    res.status(200).json(receiptData);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};
/*
exports.summary_full = async function (req, res) {
   const summaryData = await async.parallel(
      {
        income: function (callback) {
          Income.find({ author: req.session.authUserID }).exec(callback);
        },
        receipt: function (callback) {
          Receipt.find({ author: req.session.authUserID }).exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        
      }
    );
  } else {
    async.parallel(
      {
        income: function (callback) {
          Income.find({ author: '62a21b717001a8755da33cf7' }).exec(callback);
        },
        receipt: function (callback) {
          Receipt.find({ author: '62a21b717001a8755da33cf7' }).exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        res.render('summary', {
          title: 'Summary',
          incomes: results.income,
          receipts: results.receipt,
          authUser: 'Sample',
          authorID: '62a21b717001a8755da33cf7',
          authCheck: req.session.isAuth,
        });
      }
    );
  }
};
*/
