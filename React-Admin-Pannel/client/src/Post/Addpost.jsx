import React, {useState} from "react";
import { Box, Button, form, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AddPostData } from "../Store/PostSlice";


const initialValues = {
   fname:"",
    lname:"",
    email:"",
    password:"",
    phone:"",
    address:"",
};

const Addpost = () => {

 const [User, setUser] = useState(initialValues)

 const dispatch=useDispatch()
 const navigate = useNavigate()
 
const handleFormControl = (e)=>{
    const {name , value} =e.target
  setUser({...User, [name]:value})
  //name:"Samir"
  console.log(User)
}



const handleSubmit = (e)=>{
  e.preventDefault()
  console.log("user -", User)
  dispatch(AddPostData(User))
  navigate("/post")
}

  const isNonMobile = useMediaQuery("(min-width:600px)");

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
                label="fname"
            
                onChange={handleFormControl}
                sx={{ gridColumn: "span 2" }}
                name="fname"

              />
        
        <TextField
                fullWidth
                variant="filled"
                type="text"
                label="lname"
            
                onChange={handleFormControl}
                sx={{ gridColumn: "span 2" }}
                name="lname"

              /><TextField
                fullWidth
                variant="filled"
                type="text"
                label="email"
            
                onChange={handleFormControl}
                sx={{ gridColumn: "span 2" }}
                name="email"

              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="password"
            
                onChange={handleFormControl}
                sx={{ gridColumn: "span 2" }}
                name="password"

              />


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="phone"
                sx={{ gridColumn: "span 2" }}
                onChange={handleFormControl}
         
                name="phone"
          
              />

<TextField
                fullWidth
                variant="filled"
                type="text"
                label="address"
                sx={{ gridColumn: "span 2" }}
                onChange={handleFormControl}
         
                name="address"
          
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
};

export default Addpost ;
