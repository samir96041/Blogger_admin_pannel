const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/e-comm')
// console.log("connection success")

const dbconnection= ()=>{
    const dbURI = 'mongodb://localhost:27017/blogger-db'
    console.log("connection success")
    return mongoose.connect(dbURI)
}
module.exports = dbconnection