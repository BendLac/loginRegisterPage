const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password1",
    database: "signup"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const name = req.body.name;
    const email = req.body.email;
    const password = (req.body.password).toString();

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query(sql, [name, email, hash], (err, data) => {
            if(err) {
                return res.json("Error");
            }
            return res.json(data);
        });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ?";
    const email = req.body.email;
    const password = (req.body.password).toString();

    db.query(sql, [email], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            let userPassword = (data[0].password).toString();
            bcrypt.compare(password, userPassword, (error, response) => {
                if(error) {
                    return res.json("Error comparing passwords");
                }
                if(response) {
                    return res.json("Success");
                } else {
                    res.send({message: "Wrong username / password combanition!"});
                }
            })
        } else {
            return res.json("Failed");
        }
    })
})

app.listen(8081, () => {
    console.log("listening");
})