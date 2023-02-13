const {MongoClient} = require('mongodb');
const dotenv = require('dotenv')
dotenv.config();

//mongoDB
const url = process.env.MONGOURL
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
