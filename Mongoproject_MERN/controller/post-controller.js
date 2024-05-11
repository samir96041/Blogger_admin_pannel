
// const model = require('../model/post-model')
const post1 = require('../model/post-model')
const { post } = require('../router/post-router')
const authdata = require('../model/author-mode')

// let getpost = async(req, res)=>{
// try {

//     let getpostData = await getpostdetails.getpostdetails()
//     console.log(getpostData)
//     res.send(getpostData)

// } catch (error) {
//     console.log(error)
// }

let getpostdetails = async (req, res) => {
    try {
        let data = await post1.find().populate('author', '_id name email')
        console.log('all posts', data)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}
let getpostdetailsbyID = async (req, res) => {
    try {
        let data = await post1.find().populate('author', '_id name email')
        console.log('all posts', data)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}


let addpostdetails = async (req, res) => {

    try {
        let data = new post1(req.body)
        let addData = await data.save()
        res.send(addData)
        console.log(addData)
    } catch (error) {
        console.log(error)
    }
}

let updatepostDetails = async (req, res) => {
    
    try {
        
        let postData = await post1.updateOne(
            req.params.id,
            { $set: req.body },
            { new: true } // Return the updated document
        )
        res.send(postData)

    }
    catch (error) {
        console.log(error)
    }
}

let deletepostData = async (req, res) => {
    let data = new post1(req.params)
    try {

        console.log(data)
        let postData = await data.deleteOne()
        res.send(postData)
    } catch (error) {
        console.log(error)
    }
}

// }
module.exports = { getpostdetails,getpostdetailsbyID, addpostdetails, updatepostDetails, deletepostData }