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



const shift_wise = async(req, res) => {
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
        const select=`a.shift_name, (SELECT COUNT(*) FROM td_vehicle_in AS b, td_receipt AS e WHERE e.vehicle_in_id = b.vehicle_in_id AND date (b.date_time_in) >= '${value.from_date}' AND date(b.date_time_in) <= '${value.to_date}' AND time(b.date_time_in) >= a.f_time AND time(b.date_time_in) <= a.t_time) AS quantity, (SELECT SUM(f.paid_amt) FROM td_vehicle_in AS c, td_receipt AS f WHERE f.vehicle_in_id = c.vehicle_in_id AND f.trans_flag = 'P' AND date(c.date_time_in) >= '${value.from_date}' AND date(c.date_time_in) <= '${value.to_date}' AND time(c.date_time_in) >= a.f_time AND time(c.date_time_in) <= a.t_time) AS totalAmount, (SELECT SUM(g.paid_amt) FROM td_vehicle_in AS d, td_receipt AS g WHERE g.vehicle_in_id = d.vehicle_in_id AND g.trans_flag = 'A' AND date(d.date_time_in) >= '${value.from_date}' AND date(d.date_time_in) <= '${value.to_date}' AND time(d.date_time_in) >= a.f_time AND time(d.date_time_in) <= a.t_time) AS TotalAdvance , h.operator_name,h.user_id`,
        tablename=`md_shift AS a, md_operator AS h `,
        where=`h.customer_id=a.customer_id AND h.customer_id=${userData.customer_id}`;
        var data=await db_Select(select,tablename,where,null)
        console.log(data)
        res.json(sendOkResponce(data,null));
    }catch(err){
        res.json(sendErrorResponce(err));
    }
}


const operator_wise = async(req, res) => {
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
        const tablename=`td_vehicle_in a,td_receipt b,md_vehicle c, md_user d, md_operator e `,
        where=`b.vehicle_in_id=a.vehicle_in_id AND c.vehicle_id=a.vehicle_id AND d.id=a.user_id_in AND e.user_id=d.user_id AND a.customer_id=${userData.customer_id} AND date(a.created_at) BETWEEN '${value.from_date}' AND '${value.to_date}' `,
        orderby=`GROUP BY e.user_id`;
        var data=await db_Select('a.*,SUM(b.paid_amt) AS paid_amt,c.*,e.*',tablename,where,orderby)
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

module.exports = { vehicle_wise,shift_wise,detail_report,operator_wise, unbilled_report };