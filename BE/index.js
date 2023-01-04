const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const axios = require('axios');


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
//freeSQL databse
// const db = mysql.createConnection({
//     host: 'sql6.freesqldatabase.com',
//     user: 'sql6586741',
//     password: 'WVbHsnwH2g',
//     database: 'sql6586741',
//     port: 3306
// })

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
    let qrr = `SELECT * FROM properties order by id desc;`;
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
//getTheme Color
app.get("/bg-color", (req, res) => {
    console.log("Api running to fetch bg color");
    let qrr = `SELECT bgcolor FROM user where id = 6;`;
    db.query(qrr, (err, results) => {
        if (err) {
            console.log("Error", err);
        } else {
            res.send({
                message: "theme color fetched from DB",
                data: results
            });
        }

    });
})
//get City
app.get("/getCity", (req, res) => {
    console.log("Api running to fetch bg color");
    let qrr = `SELECT DISTINCT City FROM properties;`; 
    db.query(qrr, (err, results) => {
        if (err) {
            console.log("Error", err);
        } else {
            res.send({
                message: "Cities Fetched",
                data: results
            });
        }

    });
})

//create data in db 
app.post("/bg-color", (req, res) => {
    let colorBG = req.body.colorBG;
    let qr = `UPDATE user SET bgcolor= '${colorBG}' WHERE  id = 6;`;
    db.query(qr, (err) => {
        if (err) {
            console.log("Error", err)
        }
        res.send({
            message: "Pushed Color into DB"
        });

    })
})

//post properties in DB

//Email part
async function sendEmail(name, email, subject, message) {
    const data = JSON.stringify({
        "Messages": [{
            "From": { "Email": "kickstartcodes@gmail.com", "Name": "Rent Easy" },
            "To": [{ "Email": email, "Name": name }],
            "Subject": subject,
            "TextPart": message
        }]
    });

    const config = {
        method: 'post',
        url: 'https://api.mailjet.com/v3.1/send',
        data: data,
        headers: { 'Content-Type': 'application/json' },
        auth: { username: '7c6d0f681bf935af8961905ae46b1ae6', password: 'f23dacbfc3cff9aada4dd69a4d1e4bcf' },
    };

    return axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}

//create data in db 
app.post("/create-properties", (req, res) => {
    console.log("Post api to add property");
    let title = req.body.title;
    let mobile = req.body.mobile;
    let address = req.body.address;
    let city = req.body.city;
    let img = req.body.img;
    let nameUser = req.body.nameUser;
    let imgUser = req.body.imgUser;
    let propType = req.body.propType;
    let price = req.body.price;
    let email = req.body.email;
    let subject = `Property Listed: ${title}`;
    let message = `Hello,\n${nameUser} your property is now live wish us please be available at your mobile number ${mobile} for the same.\nAddress: ${address}\n\nCity: ${city}\nPurpose: ${propType}\n\nThank You`;

    sendEmail(nameUser, email, subject, message);

    let qr = `insert into properties (title,address,city,img,nameUser,imgUser,mobile,propType,price,emailUser) value ("${title}","${address}","${city}","${img}","${nameUser}","${imgUser}","${mobile}","${propType}","${price}","${email}");`;
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
    let qr2 = `SELECT title,nameUser,emailUser from properties WHERE id=${qrid};`

    db.query(qr2, (err, results) => {
        if (err) {
            console.log("Error", err)
        }
        else {
            let title = results[0].title
            let name = results[0].nameUser
            let email = results[0].emailUser
            let subject = `Property Removed "${title}"`
            let message = `Hello,\n${name} your property "${title}" was removed by Rent Easy team due to some violations done by you.\n\nThank You`;
            sendEmail(name, email, subject, message);
        }
    })

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

