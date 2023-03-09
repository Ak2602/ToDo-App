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
        let displayQuery = "SELECT * FROM to_do_details";
        con.query(displayQuery, function (err, rows) {
          if (err) throw err;
          res.render("list", { data: rows });
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
    let displayQuery = "SELECT * FROM to_do_details";
    con.query(displayQuery, function (err, rows) {
      if (err) throw err;
      console.log("Removed success");
      res.render("list", { data: rows });
    });
  });
};
