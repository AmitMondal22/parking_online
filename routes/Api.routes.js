const express = require('express');
const { register, login, test, change_password } = require('../controller/api/Auth.controller');
const { checkedToken } = require('../middleware/ApiAuthChecked.middleware');
const { vehicle_list } = require('../controller/api/Vehicle.controller');
const { general_settings, receipt_setting, rate_dtls_list, gst_list, fixed_rate_dtls_list } = require('../controller/api/Master.controller');
const { car_in, search_car, out_pass } = require('../controller/api/CarInCarOut.controller');
const { vehicle_wise, detail_report, shift_wise, operator_wise } = require('../controller/api/ReportApi.controller');
const Api=express.Router();

Api.post('/auth/register', register);
Api.post('/auth/login', login);
Api.post('/auth/change_password',checkedToken, change_password);
Api.post('/auth/testtoken',checkedToken, test);


Api.post('/vehicle/list',checkedToken, vehicle_list);

Api.post('/master/general_settings',checkedToken, general_settings);
Api.post('/master/receipt_setting',checkedToken, receipt_setting);
Api.post('/master/rate_dtls_list',checkedToken, rate_dtls_list);
Api.post('/master/fixed_rate_dtls_list',checkedToken, fixed_rate_dtls_list);
Api.post('/master/gst_list',checkedToken, gst_list);


Api.post('/car/car_in',checkedToken, car_in);
Api.post('/car/search_car',checkedToken, search_car);


Api.post('/car/out_pass',checkedToken, out_pass);


Api.post('/report/vehicle_wise',checkedToken, vehicle_wise);
Api.post('/report/detail_report',checkedToken, detail_report);
Api.post('/report/shift_wise',checkedToken, shift_wise);
Api.post('/report/operator_wise',checkedToken, operator_wise);



// Api.post('/auth/testtoken',checkedToken, test);

module.exports = {Api};