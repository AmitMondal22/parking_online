const Joi = require("joi");
const { db_Select } = require("../../model/Master.model");
const { sendOkResponce,sendErrorResponce } = require("response-json-format");

const vehicle_wise = async(req, res) => {
    try{
        const schema = Joi.object({
            from_date: Joi.string().required(),
            to_date: Joi.string().required()
        });
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.context.key] = detail.message;
            });
            return res.json(sendErrorResponce(null,errors));
        }


        const userData = req.user;
        const tablename=`td_vehicle_in a,td_receipt b,md_vehicle c`,
        where=`b.vehicle_in_id=a.vehicle_in_id AND c.vehicle_id=a.vehicle_id AND a.customer_id=${userData.customer_id} AND a.device_id='${userData.device_id}' AND a.user_id_in=${userData.id}  AND date(a.created_at) BETWEEN '${value.from_date}' AND '${value.to_date}' `,
        orderby=`GROUP BY a.vehicle_id`;
        var data=await db_Select('a.*,SUM(b.paid_amt) AS paid_amt,c.*',tablename,where,orderby)
        console.log(data)
        res.json(sendOkResponce(data,null));
    }catch(err){
        res.json(sendErrorResponce(err));
    }
}


const detail_report = async(req, res) => {
    try{
        const schema = Joi.object({
            from_date: Joi.string().required(),
            to_date: Joi.string().required()
        });
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.context.key] = detail.message;
            });
            return res.json(sendErrorResponce(null,errors));
        }


        const userData = req.user;
        const tablename=`td_vehicle_in a,td_receipt b`,
        where=`b.vehicle_in_id=a.vehicle_in_id AND a.customer_id=${userData.customer_id} AND a.device_id='${userData.device_id}' AND a.user_id_in=${userData.id}  AND date(a.created_at) BETWEEN '${value.from_date}' AND '${value.to_date}'`;
        var data=await db_Select('a.*,b.*',tablename,where,null)
        console.log(data)
        res.json(sendOkResponce(data,null));
    }catch(err){
        res.json(sendErrorResponce(err));
    }
}



const unbilled_report = async(req, res) => {
    try{
        const schema = Joi.object({
            from_date: Joi.string().required(),
            to_date: Joi.string().required()
        });
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.context.key] = detail.message;
            });
            return res.json(sendErrorResponce(null,errors));
        }


        const userData = req.user;
        const tablename=`td_vehicle_in a,td_receipt b`,
        where=`b.vehicle_in_id=a.vehicle_in_id AND a.customer_id=${userData.customer_id} AND a.device_id='${userData.device_id}' AND a.user_id_in=${userData.id}  AND date(a.created_at) BETWEEN '${value.from_date}' AND '${value.to_date}'`;
        var data=await db_Select('a.*,b.*',tablename,where,null)
        console.log(data)
        res.json(sendOkResponce(data,null));
    }catch(err){
        res.json(sendErrorResponce(err));
    }
}

module.exports = { vehicle_wise,detail_report,unbilled_report };