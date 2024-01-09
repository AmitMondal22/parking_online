const { db_Select } = require('../model/Master.model');

const express = require('express'),
    reportRouter = express.Router(),
    dateFormat = require('dateformat');

reportRouter.get('/details_report', async (req, res) => {
    var data = {
        title: 'Detail Report',
        page_path:'reports/details_report',
        dtFormat: dateFormat
    }
    res.render('common/layouts/main', data)
})

reportRouter.post('/get_details_report', async (req, res) => {
    var data = req.body;
    var select = `receiptNo, date_time_in, mc_srl_no, vehicleType, vehicle_no, opratorName, date_time_out, paid_amt, mc_srl_no_out`, 
    table_name = 'td_backlog_data', 
    whr = `DATE(date_time_out) BETWEEN '${data.frm_dt}' AND '${data.to_dt}'`, 
    order = 'ORDER BY receiptNo';
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send(res_dt)
})

module.exports = {reportRouter}