const { cust_name } = require('../controller/customer/Customer.controller');
const { AuthCheckedMW } = require('../middleware/AuthChecked.middleware');

const express = require ('express'),
Customer_settingRouter = express.Router();

Customer_settingRouter.get('/customer_dt',AuthCheckedMW,cust_name)

module.exports = { Customer_settingRouter }