import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, form, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {updateData} from '../Store/PostSlice';
// import { Navigate } from 'react-router-dom';



const Editpost = () => {
  

  const initialValues={
    title:"",
    description:"",
    status:"",
    category:"",
}




const {id}=useParams()
// console.log(id)

const navigate= useNavigate()
const dispatch = useDispatch();

const [Post, updatePost] = useState(initialValues)

const inputChangeHandler=(event)=>{
  const {name, value}=event.target
  updatePost({...Post,[name]:value})
 
}

// console.log("post",Post)


const fetchPost =useSelector((state)=>state.PostR)

// console.log("setPost",fetchPost)

const post = fetchPost.PostData



useEffect(() => {
  if (id && post.length > 0) {
    const currentPost = post.find((ele) => ele._id === id);
    updatePost(currentPost);
  }
}, [id, post]);





const FormSubmitHandler = (e) => {
  e.preventDefault();
  const { _id, ...postData } = Post; // Extracting _id and sending the rest of the data
  dispatch(updateData({ ID: _id, data: postData }));
  navigate("/post");
};


    const isNonMobile = useMediaQuery("(min-width:600px)");

   

  return (
    <Box m={"200px"}>

    <form onSubmit={FormSubmitHandler} >
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
   

<TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                value={Post && Post.title}
                onChange={inputChangeHandler}
                sx={{ gridColumn: "span 2" }}
                name="title"

              />
        


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                sx={{ gridColumn: "span 2" }}
                onChange={inputChangeHandler}
                value={Post && Post.description}
                name="description"
          
              />



      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained" navigate >
      Add New Post
        </Button>
      </Box>
    </form>
 

</Box>
  )
}

export default Editpost