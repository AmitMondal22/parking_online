const express = require('express');
const { test, login, login_post } = require('../controller/customer/CAuth.controller');
const { dashboard, blank } = require('../controller/customer/Dashboard.controller');
const { AuthCheckedMW, LoginCheckedMW, logout } = require('../middleware/AuthChecked.middleware');
const { vehicle, operator_add, operator_add_post } = require('../controller/customer/Master_cust.controller');

const Customer=express.Router();

Customer.get('/test',test);
Customer.get('/login',LoginCheckedMW,login);
Customer.post('/login',LoginCheckedMW,login_post);
Customer.get('/logout',logout);



Customer.get('/',AuthCheckedMW,dashboard);

Customer.get('/blank',AuthCheckedMW,blank);



Customer.get('/vehicle',AuthCheckedMW,vehicle);

Customer.get('/operator/add',AuthCheckedMW,operator_add);
Customer.post('/operator/add',AuthCheckedMW,operator_add_post);


module.exports = {Customer};