const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const {
    dbConnectUser,
    dbConnectProperties
} = require('./mongodb')
const mongoDb = require('mongodb')
const app = express();

app.use(cors());
app.use(bodyparser.json());

app.listen(3000, () => {
    console.log('BE Running at Port 3000');
})

//get properties data from DB
app.get("/properties", (req, res) => {
    console.log("Api running to fetch from Database only (Query SQL)");
    //mongoDB
    const fecthProp = async () => {
        let dataProperties = await dbConnectProperties();
        dataProperties = await dataProperties.find().toArray();
        res.send({
            data: dataProperties
        });
    }
    fecthProp();

})
//getTheme Color
app.get("/bg-color", (req, res) => {
    console.log("Api running to fetch bg color");
    //mongoDB
    const fetchColor = async () => {
        let dataUser = await dbConnectUser();
        dataUser = await dataUser.find({
            "id": 6
        }).toArray();
        res.send(dataUser[0].color)
    }
    fetchColor();
})
//get City
app.get("/getCity", (req, res) => {
    const fetchCity = async () => {
        let dataProperties = await dbConnectProperties();
        dataProperties = await dataProperties.distinct("City");
        res.send({
            data: dataProperties
        });
    }
    fetchCity();
})

//add views
app.post("/views", (req, res) => {
    let views = req.body.views
    let _id = req.body._id
    const viewsUpdate = async () => {
        let dataProperties = await dbConnectProperties();
        dataProperties.updateOne({
            '_id': new mongoDb.ObjectId(_id)
        }, {
            $set: {
                "views": views
            }
        })
    }
    viewsUpdate();
    res.send("Views Registered")

})

//Email part
async function sendEmail(name, email, subject, message) {
    const data = JSON.stringify({
        "Messages": [{
            "From": {
                "Email": "kickstartcodes@gmail.com",
                "Name": "Tridion Sites"
            },
            "To": [{
                "Email": email,
                "Name": name
            }],
            "Subject": subject,
            "TextPart": message
        }]
    });

    const config = {
        method: 'post',
        url: 'https://api.mailjet.com/v3.1/send',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        },
        auth: {
            username: '7c6d0f681bf935af8961905ae46b1ae6',
            password: 'f23dacbfc3cff9aada4dd69a4d1e4bcf'
        },
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
    let message = `Hello,\n${nameUser} your property is now live with us please be available at your mobile number ${mobile} for the same.\nAddress: ${address}\n\nCity: ${city}\nPurpose: ${propType}\n\nThank You`;

    sendEmail(nameUser, email, subject, message);
    let result = req.body
    console.log(result)
    const creatingProp = async () => {
        let prop = await dbConnectProperties();
        prop = await prop.insertOne(result)
        res.send(true);
    }
    creatingProp();

})


app.post("/sendMailFonto", (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let message = req.body.message;
    let subject = `Content for Approval`;
    sendEmail(name, email, subject, message);
    res.send(`Mail sent to ${email}`)
})
//delete prperty
app.delete("/delete/:id", (req, res) => {
    console.log("Deleting property by id-:", req.params.id);
    var qrid = req.params.id;
    // let qr = `DELETE FROM properties WHERE id=${qrid};`
    // let qr2 = `SELECT title,nameUser,emailUser from properties WHERE id=${qrid};`
    const fecthProp = async () => {
        let dataProperties = await dbConnectProperties();
        const Email123 = async () => {
            try {
                dataProperties = await dataProperties.find({
                    _id: new mongoDb.ObjectId(qrid)
                }).toArray();
                console.log(dataProperties)
            } catch (error) {
                res.send({
                    message: "error",
                    data: error
                })
            }
            let title = dataProperties[0].title
            let name = dataProperties[0].nameUser
            let email = dataProperties[0].emailUser
            let subject = `Property Removed "${title}"`
            let message = `Hello,\n${name} your property "${title}" was removed by Rent Easy team due to some violations done by you.\n\nThank You`;
            sendEmail(name, email, subject, message);
        }
        Email123();
        dataProperties.deleteOne({
            "_id": new mongoDb.ObjectId(qrid)
        })
        res.send("Property deleted")

    }
    fecthProp();
})



//name and image by email
app.get("/name/:email", (req, res) => {
    let email = req.params.email;
    console.log("Api running to fetch name by email");
    const emailUser = async () => {
        let userData = await dbConnectUser();
        userData = await userData.find({
            "email": `${email}`
        }).toArray();
        if (isEmpty(userData)) {
            res.send(false)
        } else {
            let object = {
                "name": userData[0].name,
                "netImg": userData[0].netImg
            }
            res.send({
                data: object.name,
                body: object.netImg
            })
        }
    }
    emailUser()
})

//create user data in db 
app.post("/user", (req, res) => {
    console.log("Post api to create user");
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let netImg = req.body.netImg;
    let result = {
        "name": name,
        "email": email,
        "password": password,
        "netImg": netImg,
    }
    console.log(result)
    const creatingUser = async () => {
        let userData = await dbConnectUser();
        userData = await userData.insertOne(result)
        res.send(true);
    }
    creatingUser();
})

//auth
app.post('/auth', (request, res) => {
    let email = request.body.email;
    let password = request.body.password;
    const auth = async () => {
        let userData = await dbConnectUser();
        userData = await userData.find({
            "email": `${email}`
        }).toArray();
        if (isEmpty(userData)) {
            res.send(false)
        } else {
            let object = {
                "email": userData[0].email,
                "password": userData[0].password
            }
            let responseFinal = object.email === email && object.password === password
            res.send(responseFinal)
        }
    }
    auth()

});


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}