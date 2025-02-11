const express = require("express");

const expense_controller = require("../controllers/expenseController");
const income_controller = require("../controllers/incomeController");
const user_controller = require("../controllers/userController");
const Expense = require("../models/expense");
const Income = require("../models/income");
const requireAuth = require("../middleware/requireAuth");
const pagination = require("../middleware/paginatedResults");

const router = express.Router();

//create new user
router.post("/user/create", user_controller.post_new_user);
//login check
router.post("/user/login", user_controller.user_login);

//require auth for all routes below
router.use(requireAuth.requireAuth);

//Get all income data
router.get(
	"/income",
	//requireAuth.requireAuth,
	income_controller.get_all_income,
	pagination.paginatedResults(Income)
);
//Get Single Income
router.get(
	"/income/:id",
	//requireAuth.requireAuth,
	income_controller.get_single_income
);
//Post new income
router.post(
	"/income/create",
	//requireAuth.requireAuth,
	income_controller.income_create_post
);
//Delete Income
router.delete(
	"/income/:id",
	//requireAuth.requireAuth,
	income_controller.income_delete
);
//Update Income
router.put(
	"/income/:id",
	//requireAuth.requireAuth,
	income_controller.income_update
);

//Get All Expenses
router.get(
	"/expense",
	//requireAuth.requireAuth,
	expense_controller.expense_list,
	pagination.paginatedResults(Expense)
);
//Create new expense
router.post(
	"/expense/create",
	//requireAuth.requireAuth,
	expense_controller.expense_create
);
//Update expense
router.put(
	"/expense/:id",
	//requireAuth.requireAuth,
	expense_controller.expense_update
);
//Delete Expense
router.delete(
	"/expense/:id",
	//requireAuth.requireAuth,
	expense_controller.expense_delete
);

module.exports = router;
