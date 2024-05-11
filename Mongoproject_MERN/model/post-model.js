//*****MONGODB*****//
// let  dbConnect  = require('../helper/mongodb');

// const { default: mongoose } = require("mongoose");

// let getPostsCollection = async ()=>{
//   const db = await dbConnect();
//   return db.collection('post');
// }

// let getpostdetails = async () => {
//   const usersCollection = await getPostsCollection();
//   return usersCollection.find({}).toArray();
// }

// let addpostddetails = async()=>{
//   const insertResult = await  getPostsCollection();
//   return insertResult.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
 
// }

// module.exports = { getpostdetails,addpostddetails }




                //****MONGOOSE****/

  const mongoose = require('mongoose') 
  
  const postSchema = new mongoose.Schema({
   title:{type:String},
   description:{type:String},
   status: String,
   category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categorys' 
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author' 
  }
  
  });

 let post1 =  mongoose.model('posts', postSchema)



//   let getpostdetails = async()=>{
//     try {
//         let posts = await post1.find()
//         console.log('all posts', posts)
//         return posts;
//     } catch(error){
//     console.log(error)
//     }
// }

module.exports = post1