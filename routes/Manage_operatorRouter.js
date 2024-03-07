const { operator } = require('../controller/customer/Operator.controller');
const { AuthCheckedMW } = require('../middleware/AuthChecked.middleware');

const express = require('express'),
Manage_operatorRouter = express.Router(),
dateFormat = require('dateformat');

Manage_operatorRouter.get('/manage_operator',AuthCheckedMW,operator)

module.exports = { Manage_operatorRouter }