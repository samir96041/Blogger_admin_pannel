import React, {useState} from "react";
import { Box, Button, form, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AddComment } from "../../Store/CommentSlice";

const initialState = {
  comment:"",
  subject:"",
}

const Addcomment =()=>{

    const [comment, setComment]= useState(initialState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormControl= (e)=>{
        console.log(e)
        const {name , value}=e.target
        setComment({...comment, [name]:value})

    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(AddComment(comment) )
        navigate("/Comment")
        
    }

    return (
      <Box m={"200px"}>
  
            <form onSubmit={handleSubmit}>
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
                  
                  onChange={handleFormControl}
                  sx={{ gridColumn: "span 2" }}
                  name="comment"
  
                />
          

          
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Subject"
                  sx={{ gridColumn: "span 2" }}
                  onChange={handleFormControl}
           
                  name="subject"
            
                />
  
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" NaviGate>
              Add New Post
                </Button>
              </Box>
            </form>
         
      
      </Box>
    );
       

}

export default Addcomment