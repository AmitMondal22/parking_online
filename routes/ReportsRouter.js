const { AuthCheckedMW } = require('../middleware/AuthChecked.middleware');
const { db_Select } = require('../model/Master.model');

const express = require('express'),
    reportRouter = express.Router(),
    dateFormat = require('dateformat');

reportRouter.get('/details_report', AuthCheckedMW, async (req, res) => {
    var data = {
        title: 'Detail Report',
        page_path:'reports/details_report',
        dtFormat: dateFormat
    }
    res.render('common/layouts/main', data)
})

reportRouter.post('/get_details_report', AuthCheckedMW, async (req, res) => {
    var data = req.body;
    var select = `receiptNo, date_time_in, mc_srl_no, vehicleType, vehicle_no, opratorName, date_time_out, paid_amt, mc_srl_no_out`, 
    table_name = 'td_backlog_data', 
    whr = `DATE(date_time_out) BETWEEN '${data.frm_dt}' AND '${data.to_dt}'`, 
    order = 'ORDER BY receiptNo';
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send(res_dt)
})

reportRouter.get('/veh_wise_repo', AuthCheckedMW, async (req, res) => {
    var data = {
        title: 'Veichle Wise Report',
        page_path:'reports/veh_wise_repo',
        dtFormat: dateFormat
    }
    res.render('common/layouts/main', data)
})

reportRouter.post('/get_veh_wise_report', AuthCheckedMW, async (req, res) => {
    var data = req.body;
    var select = `mc_srl_no_out, vehicleType, COUNT(receiptNo) tot_vehi, SUM(paid_amt) tot_amt`, 
    table_name = 'td_backlog_data', 
    whr = `DATE(date_time_out) BETWEEN '${data.frm_dt}' AND '${data.to_dt}'`, 
    order = 'GROUP BY vehicleType, mc_srl_no_out';
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send(res_dt)
})

reportRouter.get('/dev_wise_repo', AuthCheckedMW, async (req, res) => {
    var data = {
        title: 'Device Wise Report',
        page_path:'reports/dev_wise_repo',
        dtFormat: dateFormat
    }
    res.render('common/layouts/main', data)
})

reportRouter.post('/get_dev_wise_report', AuthCheckedMW, async (req, res) => {
    var data = req.body;
    var select = `vehicleType, COUNT(receiptNo) tot_vehi, SUM(paid_amt) tot_amt`, 
    table_name = 'td_backlog_data', 
    whr = `DATE(date_time_out) BETWEEN '${data.frm_dt}' AND '${data.to_dt}'`, 
    order = 'GROUP BY vehicleType';
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send(res_dt)
})

reportRouter.get('/usr_wise_repo', AuthCheckedMW, async (req, res) => {
    var data = {
        title: 'User Wise Report',
        page_path:'reports/usr_wise_repo',
        dtFormat: dateFormat
    }
    res.render('common/layouts/main', data)
})

reportRouter.post('/get_user_wise_report', AuthCheckedMW, async (req, res) => {
    var data = req.body;
    var select = `opratorName, mc_srl_no_out, COUNT(receiptNo) tot_vehi, SUM(paid_amt) tot_amt`, 
    table_name = 'td_backlog_data', 
    whr = `DATE(date_time_out) BETWEEN '${data.frm_dt}' AND '${data.to_dt}'`, 
    order = 'GROUP BY opratorName, mc_srl_no_out';
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send(res_dt)
})

module.exports = {reportRouter}