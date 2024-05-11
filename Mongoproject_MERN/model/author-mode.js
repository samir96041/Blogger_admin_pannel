const mongoose = require('mongoose')

const Schema = mongoose.Schema({

    fname:{type:String, required:true},
    lname:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    posts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    }

})

let author =  mongoose.model('author',Schema )

module.exports = author