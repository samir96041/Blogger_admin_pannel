const mongoose = require ('mongoose')
const { getuser } = require('../controller/user-controller')

const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
let md5 = require("md5");
const userShema = new mongoose.Schema({

    fname:{type:String},
    lname:{type:String},
    email:{type:String},
    password:{type:String},
    phone:{type:String},
    address:{type:String},
    created:{ type: Date, default: Date.now },
    status:{type:String},
    token:{type:String}
})

let user = mongoose.model('users', userShema)

let adduser = async(body)=>{
    try {
        console.log("body me data aya",body)
        let {password} = body;
        let md5Pass = md5(password)
        body.password = md5Pass
        let data = new user(body)
        let result = await data.save()
        console.log("added user -->", result)
        return result

    } catch (error) {
        console.log(error)
    }
}



let login =async(body)=>{
    let {email, password} = body;
    let passMd5 = md5(password)
    console.log("coverted data -->", email,passMd5)
    try {
        let getUser =await user.find({
            $and:[{email:email} , {password:passMd5}]
        })
        console.log("getting userdata",getUser)

        if (getUser.length == 0) {
            return ("Emailid and password not match")
            
        } else {
            console.log("our token key -- ",process.env.TOKEN_KEY)
            const token = jwt.sign(
                {
                    uid:getUser[0].id,
                    email:getUser[0].email,
                    fname:getUser[0].fname
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn:"2h"
                }
            )
            getUser[0].token = token
            console.log(getUser[0].token)
          
            
        }
        console.log(getUser)
        return getUser
    } catch (error) {
        console.log(error)
    }
}

module.exports = {user, adduser, login}