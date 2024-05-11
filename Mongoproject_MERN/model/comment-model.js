const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    comment:{type:String},
    subject:{type:String},
    status:{type:String},
    // posts:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"posts"
    // }
})

let comment = mongoose.model('comments',Schema)

module.exports=comment
