const Joi = require("joi");
const dateFormat = require('dateformat');
const { db_Insert } = require("../../model/Master.model");

const vehicle = async(req, res) => {
    try{
        page_data={
            title:"blank",
            page_path:'vehicle/vehicle_add',
        }
        req.flash('success', "Blank Page");
        res.render('common/layouts/main',page_data);
    }catch(err){
        res.render('/login');
    }
}

// View Create and Save a new Operator
const operator_add = async(req, res) => {


    try{
        page_data={
            title:"blank",
            page_path:'operator/add',
        }
         req.flash('success', "Blank Page");
        res.render('common/layouts/main',page_data);
    }catch(err){
        res.redirect('/login');
    }
}

// Create and Save a new Operator
const operator_add_post = async(req, res) => {
    try{
        const schema = Joi.object({
            operator_name: Joi.string().required(),
            password: Joi.string().required(),
            device_id: Joi.string().required(),
            user_id: Joi.required(),
            location_id: Joi.number().required(),
            c_password: Joi.string().valid(Joi.ref('password')).required().strict()
        });
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.context.key] = detail.message;
            });
            res.flash('error', "Invalid credentials");
            res.redirect('/operator/add');
        }        
        //req.flash('error', "Bank Add Successful");
        req.flash('success', "operator created successfully");
        res.redirect('/operator/add');
       // console.log("===========================================================");

        

        
    }catch(err){
       res.flash('error', "Error inserting data");
        res.redirect('/operator/add');
    }
}

module.exports = { vehicle, operator_add,operator_add_post };