import con from "../modals/registerDB.js";
import value from "../modals/date.js";
import { flag } from "../modals/flag.js";

export const myList = (req, res) => {
    res.render('list');
}

export const toDoDetails = (req, res)=>{
    let work = req.body.work;

    let searchQry = (`SELECT * FROM to_do_details WHERE task = "${work}"`);
    let qry = (`INSERT INTO to_do_details (date, task, flag) VALUES ("${value}", "${work}", ${flag})`);
    con.query(searchQry, function (err, result) {
        if (err) {
            res.send('Adding failed')
        }
        if (result.length !== 0) {
            res.send("task exists")
        } else {
            con.query(qry, function (err, results) {
                if (err) throw err;
                console.log("Task entered Successfully!!");
            });
        }
    });
}

export const displayData = (req, res, next)=> {
    let sql='SELECT * FROM users';
    con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('list', { title: 'User List', userData: data});
  });
}