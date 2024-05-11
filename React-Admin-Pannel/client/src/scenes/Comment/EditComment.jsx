import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, form, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../Store/CommentSlice';



const EditComment = () => {
  
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

const [Comment, updateCommentData] = useState(initialValues)

const inputChangeHandler=(event)=>{
  const {name, value}=event.target
  updateCommentData({...Comment,[name]:value})
 
}

// console.log("post",Post)


const fetchComment =useSelector((state)=>state.CommentR)

// console.log("setPost",fetchComment)

const comment = fetchComment.CommentData



useEffect(() => {
  if (id && comment.length > 0) {
    const currentComment = comment.find((ele) => ele._id === id);
    updateComment(currentComment);
  }
}, [id, comment]);





const FormSubmitHandler = (e) => {
  e.preventDefault();
  const { _id, ...commentData } = Comment; // Extracting _id and sending the rest of the data
  dispatch(updateComment({ ID: _id, data: commentData }));
  navigate("/Comment");
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
                label="Comment"
                value={Comment && Comment.inpcomm}
                onChange={inputChangeHandler}
                sx={{ gridColumn: "span 2" }}
                name="inpcomm"

              />
        


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Subject"
                sx={{ gridColumn: "span 2" }}
                onChange={inputChangeHandler}
                value={Comment && Comment.subject}
                name="subject"
          
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

export default EditComment