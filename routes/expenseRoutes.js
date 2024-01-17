const express = require('express');

const userAuthentecation = require('../middelware/auth')

const expenseController = require('../controllers/expenseController')
const paginationController = require('../controllers/paginationController')
const downloadController = require('../controllers/dowloadExpenseFile')

const router = express.Router();

router.post('/addExpense', userAuthentecation.authenticate, expenseController.postExpense);
// router.get('/addExpense', userAuthentecation.authenticate, expenseController.getExpense);    //moved to pagination
router.delete('/addExpense/:id', userAuthentecation.authenticate, expenseController.deleteExpense);

router.get('/pagination', userAuthentecation.authenticate, paginationController.pagination);
router.get('/download', userAuthentecation.authenticate, downloadController.downloadExpense);

module.exports = router;