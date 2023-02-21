const express = require('express');
const router = express.Router();
//const cors = require('cors');

const expense_controller = require('../controllers/expenseController');
const income_controller = require('../controllers/incomeController');
const summary_controller = require('../controllers/summaryController');
const user_controller = require('../controllers/userController');

//Get all income data
router.get('/income', income_controller.get_all_income);

router.get('/income/:id', income_controller.get_single_income);
//Post new income
router.post('/income/create', income_controller.income_create_post);
//Get All Receipts
router.get('/receipt', expense_controller.expense_list);
module.exports = router;
