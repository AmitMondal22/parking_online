const Joi = require("joi");
const dateFormat = require("dateformat");
const { db_Select, db_Insert } = require("../../model/Master.model");
const bcrypt = require('bcrypt');

const device = async (req, res) => {
  try {
    var custId = req.session.user.user_data.customer_id;
    let wher = `a.customer_id = b.customer_id AND a.customer_id=${custId}`;
    var device = await db_Select(
      "a.*,b.*",
      "md_setting a, md_customer b",
      wher,
      null
    );
    const page_data = {
      title: "device setting",
      page_path: "/device_setting/device_setting",
      data: device,
    };
    // console.log(data);
    res.render("common/layouts/main", page_data);
  } catch (error) {
    res.redirect("/login");
  }
};

const show_device = async (req, res) => {
  var data = req.query;
  try {
    var custId = req.session.user.user_data.customer_id;
    let select = "a.*,b.*",
      table_name = "md_setting a, md_customer b",
      whr = `a.customer_id = b.customer_id AND a.customer_id=${custId} AND a.app_id='${data.dev_id}'`;
    const device_dt = await db_Select(select, table_name, whr, null);
    res.json(device_dt);
  } catch (error) {
    res.json({
      suc: 0,
      msg: [],
    });
  }
};

const edit_device = async (req, res) => {
  var data = req.query;
  // console.log(data);
  var custId = req.session.user.user_data.customer_id;
  let select = "a.*,b.*",
    table_name = "md_setting a, md_customer b",
    whr = `a.customer_id = b.customer_id AND a.customer_id=${custId} AND a.app_id='${data.dev_id}'`;
  const resData = await db_Select(select, table_name, whr, null);
  // console.log(resData);
  delete resData.sql;
  var viewData = {
    title: "Device",
    page_path: "/device_setting/edit_device_setting",
    data: resData.suc > 0 && resData.msg.length > 0 ? resData.msg[0] : [],
    customer_id: custId,
  };
  // console.log(viewData);
  res.render("common/layouts/main", viewData);
};

const save_edit_device = async (req, res) => {
  try {
    const schema = Joi.object({
      cust_id: Joi.string(),
      app_id: Joi.string(),
      pwd: Joi.string(),
      dev_mode: Joi.string(),
      report_flag: Joi.string(),
      tot_col: Joi.string(),
      ad_pay: Joi.string(),
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    // console.log(value);
    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        errors[detail.context.key] = detail.message;
      });
      return res.json({ error: errors });
    }

    var custId = req.session.user.user_data.customer_id;
    const datetime = dateFormat(new Date(), "yyyy-mm-dd");
    var password = bcrypt.hashSync(data.pwd, 10);


    let fields = `password='${password}',report_flag='${
        value.report_flag == "Y" ? "Y" : "N"
      }',total_collection='${value.tot_col == "Y" ? "Y" : "N"}',adv_pay='${
        value.ad_pay == "Y" ? "Y" : "N"
      }',modified_by=${custId},updated_at='${datetime}'`,
      where = `customer_id='${custId}' AND app_id='${value.app_id}'`;
    let res_dt2 = await db_Insert("md_setting", fields, null, where, 1);
    // console.log(res_dt2);
    req.flash("success", "Updated successful");
    res.redirect("/device/device_name");
  } catch (error) {
    // console.log(error);
    req.flash("error", "Data not Updated Successfully");
    res.redirect("/device/device_name");
  }
};

const save_add_device = async (req, res) => {
  try {
    const schema = Joi.object({
      cust_id: Joi.string(),
      app_id: Joi.string(),
      pwd: Joi.string(),
      dev_mode: Joi.string(),
      report_flag: Joi.string(),
      tot_col: Joi.string(),
      ad_pay: Joi.string(),
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    // console.log(value);
    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        errors[detail.context.key] = detail.message;
      });
      return res.json({ error: errors });
    }

    const datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var custId = req.session.user.user_data.customer_id;

    // console.log(value)
    let fields = "(customer_id,app_id,password,dev_mod,report_flag,total_collection,adv_pay,created_at)",
      values = `('${custId}','${value.app_id}','${value.pwd}','${value.dev_mode == "D" ? "D" : "F"}',
      '${value.report_flag == "Y" ? "Y" : "N"}','${
        value.tot_col == "Y" ? "Y" : "N"
      }','${value.ad_pay == "Y" ? "Y" : "N"}','${datetime}')`;
    let res_dt = await db_Insert("md_setting", fields, values, null, 0);
    // console.log("========device==========", res_dt);
    req.flash("success", "Saved successful");
    res.redirect("/device/device_name");
    // res.send(res_dt)
  } catch (error) {
    // console.log(error);
    req.flash("error", "Data not saved Successfully");
    res.redirect("/device/device_name");
  }
};

module.exports = {
  device,
  show_device,
  edit_device,
  save_edit_device,
  save_add_device,
};
