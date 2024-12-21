 const express =  require ('express')
let bodyParser = require ('body-parser')
//CORS
const cors =require ('cors')

const app = express()
require("./config.js/db")
const port= 5000


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



require('dotenv').config()
 
app.use(cors(
  {
    origin:'http://localhost:3000/'
  }
))


const dbconnection = require('./config.js/db')


dbconnection().then(()=>{ 
  let postrouter = require("./router/post-router")
  let authorrouter = require("./router/author-router")
  let userrouter = require('./router/user-router')
  let categoryrouter = require('./router/category-router')
  let commentrouter = require("./router/comment-router")

  console.log(userrouter)
  console.log(categoryrouter)
   console.log('connected to mongodb')
   
app.use('/post', postrouter)
app.use('/author', authorrouter)
app.use('/user',userrouter)
app.use('/catrouter',categoryrouter)
app.use('/commentrouter',commentrouter)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

  