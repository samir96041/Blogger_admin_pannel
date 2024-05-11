const useModel = require ('../model/user-model')


let getuser = async(req, res)=>{

    try {
        let data =  await useModel.user.find({})
        console.log('all posts', data)
        res.send(data)
        
    } catch (error) {
        console.log(error)
    }
}

 
let adduserdata = async(req, res)=>{
    let body = req.body;
    try {
  let data= await useModel.adduser(body)
  res.send(data)
  console.log("adduserdata ye wala hai",data )
    } catch (error) {
        console.log(error)
    }
}


let updateuser = async(req , res)=>{
    try {
        let userData= await useModel.updateOne(
             req.params.id,
            { $set: req.body },
            { new: true })
            res.send(userData)
        
    }
    
    catch (error) {
        console.log(error)
    }
}
let deleteuser = async(req,res)=>{
    let data = new useModel(req.params)
    try {
        console.log(data)
        let result = await data.deleteOne()

        res.send("deleted data ",result)
    } catch (error) {
        console.log(error)
    }
}

let loginUser =async(req,res)=>{
try {
    let data = await useModel.login(req.body)
    res.send(data)
} catch (error) {
    console.log(error)
    res.send(error)
}
}

module.exports = {getuser ,adduserdata , deleteuser, updateuser,loginUser}