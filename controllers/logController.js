import { name } from "ejs";
import con from "../modals/registerDB.js";

export const getLogin = (req, res)=>{
    res.render('login');
}
export const valLogin = (req, res)=>{
    let us = req.body.user;
    let ps = req.body.pass;
    if (us && ps) {
        let compareQry = (`SELECT * FROM credentials WHERE f_name = "${us}" AND password = "${ps}"`);
        con.query(compareQry, function (err, rows, fields) {
            if (err) throw err;
            if (rows.length <= 0) {
                req.flash('warn', 'Invalid Credentials!!!')
                res.redirect("/login");
            } else {
                console.log("true");
                req.session.loggedin = true;
                req.session.name = name;
                req.flash('success', 'Login Successfull');
                res.render('list');
            }
        });
    } else {
        req.flash('warn', 'Enter Details');
    }
}