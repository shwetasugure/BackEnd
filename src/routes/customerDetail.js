const express = require('express');
const { customerDetail, getAllCustomerDetail, getByIdCustomerDetail, deleteByIdCustomerDetail } = require('../controller/customerDetail')
const { requiredsignin } = require('../common-middleware/index');
const router = express.Router();


router.post('/customerDetail', requiredsignin, customerDetail);
router.get('/customerDetails', requiredsignin, getAllCustomerDetail);
router.get('/customerDetail', requiredsignin, getByIdCustomerDetail);
router.delete('/customerDetail', requiredsignin, deleteByIdCustomerDetail);


module.exports = router;