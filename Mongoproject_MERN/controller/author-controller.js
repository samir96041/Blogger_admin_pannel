
const { deleteOne } = require('../model/author-mode')
const author = require('../model/author-mode')


let getAuthorData = async (req, res)=>{

    try {
        let data = await author.find()
        console.log("all author  detail", data)
        res.json(data)
    } catch (error) {
        console.log(error)
    }


}

let getOne=async (req, res)=>{
    try {
        const id =req.params.id
        const userData= await author.findById(id)
        if (!userData) {
            return res.send("4O4 user not Found")
        }
        res.send(userData)
        
    } catch (error) {
        console.log(error)
    }
}

let addauthordetails = async (req, res)=>{
  
    try {
        let data = new author(req.body)
        console.log("data->",data)
        let addata = await data.save()
        console.log(addata)
        res.send(addata)
    } catch (error) {
        console.log(error)
    }
}

let updatauthorDetails = async (req ,res)=>{

    try{
    let data =await author.updateOne(
        req.params.id,
        {$set:req.body},
        {new:true}
    )
    res.send(data)
    }
    catch(error){
        console.log(error)
    }
}

let deleAuthorData = async(req, res)=>{
 
    try {
        let data  = new author(req.params)
       
        let authorData = await data.deleteOne()
        res.send(authorData)
        console.log(authorData)
    } catch (error) {
        console.log(error)
    }
}




module.exports = {getAuthorData,getOne,addauthordetails, updatauthorDetails, deleAuthorData}