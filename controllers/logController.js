import { name } from "ejs";
import con from "../modals/registerDB.js";

export const getLogin = (req, res) => {
  res.render("login");
};
export const valLogin = (req, res) => {
  let us = req.body.user;
  let ps = req.body.pass;
  if (us && ps) {
    let compareQry = `SELECT * FROM credentials WHERE f_name = "${us}" AND password = "${ps}"`;
    con.query(compareQry, function (err, rows, fields) {
      if (err) throw err;
      if (rows.length <= 0) {
        req.flash("warn", "Invalid Credentials!!!");
        res.redirect("/login");
      } else {
        console.log("true");
        req.session.loggedin = true;
        req.session.name = name;
        req.flash("success", "Login Successfull");
        let displayQuery = `SELECT * FROM to_do_details WHERE flag = "pending"`;
        let display2Query = `SELECT * FROM to_do_details WHERE flag = "Completed"`;
        con.query(displayQuery, function (err, row1) {
          if (err) throw err;
          const data = row1;
          con.query(display2Query, function (err, row2) {
            if (err) throw err;
            const data2 = row2;
            res.render("list", { data, data2 });
          });
        });
      }
    });
  } else {
    req.flash("warn", "Enter Details");
  }
};
