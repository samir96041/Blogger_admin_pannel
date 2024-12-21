const category =require("../model/category-model")

let getCatDetails = async (req, res)=>{
    try {
        let data =await category.find()
        console.log("all = = = category",data)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

let addCatDetails = async (req, res)=>{
  
    try {
        let data = new category(req.body)
        console.log("data->",data)
        let addata = await data.save()
        console.log(addata)
        res.send(addata)
    } catch (error) {
        console.log(error)
    }
}

let updateCatDetails =async (req, res)=>{
    try {
        let catDetails = await category.updateOne(
            req.params.id,
            {$set:req.body},
            {new:true}
            
        )
        res.send(catDetails)
    } catch (error) {
        console.log(error)
    }
}

let deletecatDeatils = async (req, res)=>{
    let data = new category(req.params)
    try {

        console.log(data)
        let catData  = await data.deleteOne()
        res.send(catData)
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={getCatDetails,addCatDetails,updateCatDetails,deletecatDeatils}