import con from '../modals/registerDB.js'

export const getRegister = (req, res)=>{
    res.render('register');
}

export const newUser = (req, res)=>{
    let f_name = req.body.f_name;
    let e_mail = req.body.e_mail;
    let pass = req.body.pass;
    let searchQry = (`SELECT * FROM credentials WHERE e_mail = "${e_mail}"`);
    let qry = (`INSERT INTO credentials (f_name, e_mail, password) VALUES ("${f_name}", "${e_mail}", "${pass}")`);
    con.query(searchQry, function (err, result) {
        if (err) {
            req.flash('warn', 'Failed to register!!');
            res.redirect('/register');
        }
        if (result.length !== 0) {
            req.flash('warn', 'Email already register!!');
            res.redirect('/register');

        } else {
            con.query(qry, function (err, results) {
                if (err) throw err;
                console.log("Registered Successfully!!");
                req.flash('success', 'User Added Successfully');
                res.redirect('/login');
            });
        }
    });
} 