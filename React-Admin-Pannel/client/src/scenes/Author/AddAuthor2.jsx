import React, {useState} from "react";
import { Box, Button, form, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';


const initialValues = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
};


const AddAuthor2 = () => {

 const [User, setUser] = useState(initialValues)

const handleFormControl = (e)=>{
  
    const {name , value} =e.target
    console.log("e.target",value)

  setUser({...User, [name]:value})
  console.log(User)
}


  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate()

  let handleSubmit=async(e)=>{
   e.preventDefault()
   await axios.post("http://localhost:5000/author/addrouter",User)
   .then((response)=>{
    console.log(response)


    toast.success("Author added successfull",{position:"top-right"})

    
    navigate("/team")
   }).catch((error)=>{console.log(error)})


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
                label="First Name"
            
                onChange={handleFormControl}
                sx={{ gridColumn: "span 2" }}
                name="fname"

              />
        


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                sx={{ gridColumn: "span 2" }}
                onChange={handleFormControl}
                
                name="lname"
          
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                sx={{ gridColumn: "span 2" }}
                onChange={handleFormControl}
            
                name="email"


              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="phone Number"
                sx={{ gridColumn: "span 2" }}
                onChange={handleFormControl}
      
                name="phone"
       
              />
{/* 
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
            
                onChange={handleFormControl}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              /> */}

              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
            
                onChange={handleFormControl}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              /> */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" naviGate>
            Add New Author
              </Button>
            </Box>
          </form>
       
    
    </Box>
  );
};

export default AddAuthor2 ;
