const express = require('express');
const router = express.Router();
//const cors = require('cors');

const receipt_controller = require('../controllers/receiptController');
const income_controller = require('../controllers/incomeController');
const summary_controller = require('../controllers/summaryController');
const user_controller = require('../controllers/userController');

//Get all income data
router.get('/income', income_controller.get_all_income);
//Post new income
router.post('/income/create', income_controller.income_create_post);
//Get all summary data
router.get(
  '/summary',
  summary_controller.summary_income,
  summary_controller.summary_receipt
);

module.exports = router;
