const { db_Select } = require("../../model/Master.model");

const cust_name = async (req, res) =>{
    try {
        var custId = req.session.user.user_data.customer_id;
        var select = "a.*,b.*",
          table_name = "md_setting a, md_customer b",
          where = `a.customer_id = b.customer_id AND a.customer_id=${custId}`;
        var customer = await db_Select(select, table_name, where, null);
        const page_data = {
          title: "customer_setting",
          page_path: "/customer_setting/customer_setting",
          data: customer,
        };
        res.render("common/layouts/main", page_data);
      } catch (error) {
        res.redirect("/login");
      }
};

module.exports = {cust_name}