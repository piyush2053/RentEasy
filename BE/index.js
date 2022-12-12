const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();

app.use(cors());
app.use(bodyparser.json());

app.listen(3000, () => {
    console.log('BE Running at Port 3000');
})

//connection to Database 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
    port: 3306
})
//checking connection with Database
db.connect(err => {
    if (err) {
        console.log("404 - Error Connecting to Database")
    } else {
        console.log("Database Connection Successful !")
    }
})

//get properties data from DB
app.get("/properties", (req, res) => {
    console.log("Api running to fetch from Database only (Query SQL)");
    let qrr = `SELECT * FROM properties order by id;`;
    db.query(qrr, (err, results) => {
        if (err) {
            console.log("Error", err);
        } else {
            res.send({
                message: "Records fetched from DB",
                data: results
            });
        }

    });
})
//post properties in DB

//create data in db 
app.post("/create-properties", (req, res) => {
    console.log("Post api to add property");
    let title = req.body.title;
    let info = req.body.info;
    let address = req.body.address;
    let city = req.body.city;
    let img = req.body.img;
    let qr = `insert into properties (title,info,address,city,img) value ("${title}","${info}","${address}","${city}","${img}");`;
    //Pushing the new user into Database
    db.query(qr, (err) => {
        if (err) {
            console.log("Error", err)
        }
        res.send({
            message: "Created in DB"
        });

    })
})
//delete prperty
app.delete("/delete/:id", (req, res) => {
    console.log("API to delete property by id-:", req.params.id);
    let qrid = req.params.id;
    let qr = `DELETE FROM properties WHERE id=${qrid};`
    db.query(qr, (err, results) => {
        if (err) {
            console.log("Error", err)
        }
        else {
            res.send({
                message: "Property deleted from a ID",
            })
        }
    })
})



//name and image by email
app.get("/name/:email", (req, res) => {
    let email = req.params.email;
    console.log("Api running to fetch name by email");
    let qrr = `SELECT name,netImg FROM user WHERE email ='${email}';`;
    db.query(qrr, (err, results) => {
        if (results.length > 0) {
            res.send({
                data: results[0].name,
                body: results[0].netImg
            });
        }
        else {
            res.send({
                message: "Error No email given"
            })
        }
    });
})



//fetch user by id
app.get("/user/:id", (req, res) => {
    console.log("API to fetch user by id-:", req.params.id);
    let qrid = req.params.id;
    let qr = `SELECT * FROM user WHERE id = ${qrid}`
    db.query(qr, (err, results) => {
        if (err) {
            console.log("Error", err)
        }
        if (results.length > 0) {
            res.send({
                message: "Users data from a ID",
                data: results
            })
        }
    })
})

//delete
app.delete("/user/:id", (req, res) => {
    console.log("API to delete user by id-:", req.params.id);
    let qrid = req.params.id;
    let qr = `DELETE FROM user WHERE id=${qrid};`
    db.query(qr, (err, results) => {
        if (err) {
            console.log("Error", err)
        }
        else {
            res.send({
                message: "Users deleted from a ID",
            })
            client.del('getUsers')
        }
    })
})
//create user data in db 
app.post("/user", (req, res) => {
    console.log("Post api to create user");
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let netImg = req.body.netImg;
    let qr = `insert into user (name,email,password,netImg) value ("${name}","${email}","${password}","${netImg}");`;
    //Pushing the new user into Database
    db.query(qr, (err) => {
        if (err) {
            console.log("Error", err)
        }
        res.send({
            message: "Created in DB"
        });

    })
})

//auth
app.post('/auth', (request, res) => {
    let email = request.body.email;
    let password = request.body.password;
    if (email && password) {
        let qr = `SELECT email,password FROM user WHERE email = '${email}' AND password = '${password}';`;
        db.query(qr, (err, results) => {
            let result1 = results.length
            if (result1 > 0) {
                res.send({
                    message: "Logged in",
                });
            }
            else {
                res.send({ message: "Error" })
            }
        })
    }
});

