const Joi = require("joi");
const dateFormat = require('dateformat');
const { sendOkResponce, sendErrorResponce } = require("../../utils/ResponceAssets");
const { db_Select, db_Insert } = require("../../model/Master.model");

const car_in = async (req, res) => {
    // try {
    const schema = Joi.object({
        vehicle_id: Joi.required(),
        vehicle_no: Joi.string().required(),
        base_amt: Joi.number().required(),
        cgst: Joi.number().required(),
        sgst: Joi.number().required(),
        paid_amt: Joi.number().required(),
        gst_flag: Joi.string().valid('Y', 'N').required(),
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = {};
        error.details.forEach(detail => {
            errors[detail.context.key] = detail.message;
        });
        return res.json(sendErrorResponce(null, errors));
    }
    const userData = req.user;
    let device_id = userData.device_id;
    let customer_id = userData.customer_id;
    let user_id = userData.id;
    let datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")
    let where = `customer_id=${customer_id} AND app_id='${device_id}'`
    const md_setting = await db_Select('*', 'md_setting', where, null)
    if ((md_setting.msg).length != 0) {
        let md_setting_data = md_setting.msg[0];
        let receipt_number = 1;
        if (md_setting_data.dev_mod == 'F') {
            let vehicle_in_fields = `(user_id_in, vehicle_id, customer_id, device_id, vehicle_no, date_time_in, oprn_mode, receipt_type, receiptNo, created_at)`,
                vehicle_in_values = `(${user_id}, ${value.vehicle_id}, ${customer_id}, '${device_id}','${value.vehicle_no}','${datetime}', '${md_setting_data.dev_mod}','${md_setting_data.parking_entry_type}',${receipt_number},'${datetime}')`;
            var td_vehicle_in = await db_Insert("td_vehicle_in", vehicle_in_fields, vehicle_in_values, null, 0);
            if (td_vehicle_in.suc == 1) {
                let insertId = td_vehicle_in.lastId.insertId;
                let receipt_fields = `(vehicle_in_id, customer_id, user_id,vehicle_no, base_amt, cgst, sgst, paid_amt, gst_flag, device_id_in,  date_time_in, trans_flag, created_at)`,
                    receipt_values = `(${insertId},${customer_id},${user_id},'${value.vehicle_no}',${value.base_amt},${value.cgst}, ${value.sgst}, ${value.paid_amt}, '${value.gst_flag}', '${device_id}','${datetime}', 'A','${datetime}')`;
                var receipt = await db_Insert("td_receipt", receipt_fields, receipt_values, null, 0);
				//res.send(receipt);
                if (receipt.suc == 1) {
                    res.json(sendOkResponce({ td_vehicle_in, receipt, receipt_number }, null));
                } else {
                    res.json(sendErrorResponce(null, { message: 'Not Inserted' }));
                }
            } else {
                res.json(sendErrorResponce(null, { message: 'Inserted' }));
            }
        }
    } else {
        return res.json(sendErrorResponce(null, { message: 'Please set general setting' }));
    }


    // } catch (error) {
    //     res.json(sendErrorResponce(error));
    // }
}


module.exports = { car_in };