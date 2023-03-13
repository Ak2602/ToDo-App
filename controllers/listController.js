import con from "../modals/registerDB.js";
import value from "../modals/date.js";
import { flag } from "../modals/flag.js";

export const myList = (req, res) => {
  res.render("list");
};

export const toDoDetails = (req, res) => {
  let work = req.body.work;

  let searchQry = `SELECT * FROM to_do_details WHERE task = "${work}"`;
  let qry = `INSERT INTO to_do_details (date, task, flag) VALUES ("${value}", "${work}", "${flag}")`;
  con.query(searchQry, function (err, result) {
    if (err) {
      res.send("Adding failed");
    }
    if (result.length !== 0) {
      res.send("task exists");
    } else {
      con.query(qry, function (err, results) {
        if (err) throw err;
        console.log("Task entered Successfully!!");
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
      });
    }
  });
};

export const removeList = (req, res) => {
  let wk = req.body.lVal;
  let deleteQuery = `Delete from to_do_details where task = "${wk}" `;
  con.query(deleteQuery, function (err, rows) {
    if (err) throw err;
    if (rows == 0) {
      req.flash("warn", "Task does not exist..");
    } else {
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
};

export const flagTask = (req, res) => {
  let edit = req.body.editText;
  let updateQuery = `UPDATE to_do_details SET flag = "Completed" WHERE task = "${edit}"`;
  con.query(updateQuery, function (err, rows) {
    if (err) throw err;
    if (rows == 0) {
      console.log("Task does not exist!!!");
    } else {
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
};
