const {MongoClient} = require('mongodb');
//mongoDB
const url = 'mongodb+srv://piyush8770162378:Camaro%402053@renteasy.vjimlit.mongodb.net/test';
const client = new MongoClient(url);

async function dbConnectUser(){
    let result = await client.connect();
    let db = result.db('RentEasy')
    return db.collection('users')
}

async function dbConnectProperties(){
    let result = await client.connect();
    let db = result.db('RentEasy')
    return db.collection('properties')
}

module.exports = {dbConnectUser,dbConnectProperties}

// dbConnect().then((resp)=>{
//     resp.find().toArray().then((data)=>{
//         console.log(data)
//     })
// })
