const express = require('express');
const router = express.Router();
//const cors = require('cors');

const expense_controller = require('../controllers/expenseController');
const income_controller = require('../controllers/incomeController');
const user_controller = require('../controllers/userController');

//Get all income data
router.get('/income', income_controller.get_all_income);
//Get Single Income
router.get('/income/:id', income_controller.get_single_income);
//Post new income
router.post('/income/create', income_controller.income_create_post);
//Delete Income
router.delete('/income/:id', income_controller.income_delete);
//Post request to update income
router.post('/income/:id', income_controller.income_update);

//Get All Expenses
router.get('/expense', expense_controller.expense_list);
//Create new expense
router.post('/expense/create', expense_controller.expense_create);
//Update expense
router.post('/expense/:id', expense_controller.expense_update);
//Delete Expense
router.delete('/expense/:id', expense_controller.expense_delete);

//Get all users
router.get('/user', user_controller.get_all_users);
//create new user
router.post('/user/create', user_controller.post_new_user);
//login check
router.post('/user/login', user_controller.user_login);

module.exports = router;
