const comment= require('../model/comment-model')


let getComment= async (req, res)=>{
    try {
        let data = await comment.find()
        console.log("all comments",data)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

let addComment = async (req, res)=>{
    try {
        let data= new comment(req.body)
        console.log("Added data",data)
        let adddata = await data.save()
        res.send(adddata)

    } catch (error) {
        console.log(error)
    }
}    

let updateComment = async (req,res)=>{
 try {
    let data = await comment.updateOne(
        req.params.id,
        {$set:req.body},
        {new:true}  
    )
    res.send(data)
 } catch (error) {
    console.log(error)
 }
}

let deleteComment = async (req, res)=>{
    let data = new comment(req.params)
    try {
     
        console.log("deleted comment",data) 
        let commentData=await data.deleteOne()
        res.send(commentData)
        console.log(commentData)
        } catch (error) {
        console.log(error)
    }
}



module.exports = {getComment,addComment,updateComment,deleteComment}