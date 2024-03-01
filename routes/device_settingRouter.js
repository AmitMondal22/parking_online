const express = require('express');
const { device, show_device } = require('../controller/customer/Device.controller');
const { AuthCheckedMW } = require('../middleware/AuthChecked.middleware');
 DeviceRouter = express.Router(),
 dateFormat = require('dateformat');

 DeviceRouter.get('/device_name',AuthCheckedMW,device);
 DeviceRouter.get('/device_details',AuthCheckedMW,show_device);



 module.exports = { DeviceRouter }
