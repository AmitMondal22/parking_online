const Joi = require('joi');
const dateFormat = require('dateformat');
const { db_Select } = require('../../model/Master.model');

const device = async (req, res) => {
    try {
      var custId = req.session.user.user_data.customer_id;
      let wher = `customer_id=${custId}`;
      var device = await db_Select("*", "md_setting", wher, null);
      const page_data = {
        title: "device setting",
        page_path: "/device_setting/device_setting",
        data: device,
      };
      // console.log(setting);
      res.render("common/layouts/main", page_data);
    } catch (error) {
      res.redirect("/login");
    }
  };

  const show_device = async (req, res) => {
    try {
        var custId = req.session.user.user_data.customer_id;
      let select =
          "a.*,b.*",
        table_name = "md_setting a, md_customer b",
        whr = `a.customer_id = b.customer_id AND a.customer_id=${custId}`;
       const device_dt = await db_Select(select, table_name, whr, null);
      res.json(device_dt);
    } catch (error) {
      res.json({
        suc: 0,
        msg: [],
      });
    }
  };

  module.exports = { device,show_device}