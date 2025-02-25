const express = require("express");

const expense_controller = require("../controllers/expenseController");
const income_controller = require("../controllers/incomeController");
const user_controller = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
//const paginatedResults = require("../middleware/paginatedResults");

const router = express.Router();

//create new user
router.post("/user/create", user_controller.post_new_user);
//login check
router.post("/user/login", user_controller.user_login);

//require auth for all routes below
router.use(requireAuth.requireAuth);

//get income paginated
router.get("/income", income_controller.income_list_paginated);
//Get Single Income
router.get("/income/:id", income_controller.get_single_income);
//Post new income
router.post("/income/create", income_controller.income_create_post);
//Delete Income
router.delete("/income/:id", income_controller.income_delete);
//Update Income
router.put("/income/:id", income_controller.income_update);

//Get Paginated Expense
router.get("/expense", expense_controller.expense_list_paginated);

//Create new expense
router.post("/expense/create", expense_controller.expense_create);
//Update expense
router.put("/expense/:id", expense_controller.expense_update);
//Delete Expense
router.delete("/expense/:id", expense_controller.expense_delete);

module.exports = router;
