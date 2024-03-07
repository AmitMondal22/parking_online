const Joi = require('joi');
const dateFormat = require("dateformat");

const operator = async (req, res) => {
    try {
      const page_data = {
        title: "Add customer",
        page_path: "/manage_operator/add_operator",
      };
      res.render("common/layouts/main", page_data);
    } catch (error) {
      res.redirect("/login");
    }
  };

  module.exports = {operator}