const express = require('express');

const userAuthentecation = require('../middelware/auth')
const purchaseController = require('../controllers/purchaseController')
const updateTransController = require('../controllers/updateTrans')

const router = express.Router();

router.get('/premiumMembership', userAuthentecation.authenticate, purchaseController.puchasePremium);
router.post('/updateTransactionStatus', userAuthentecation.authenticate, updateTransController.updateTrans);

module.exports = router;