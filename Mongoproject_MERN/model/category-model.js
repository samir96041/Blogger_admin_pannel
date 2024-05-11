//Mongoose middleware


const mongoose = require('mongoose')

const Schema =  mongoose.Schema({
    catname:{type:String, required:true},
    description:{type:String,required:true}
})

let category =  mongoose.model('category',Schema)
module.exports  = category

