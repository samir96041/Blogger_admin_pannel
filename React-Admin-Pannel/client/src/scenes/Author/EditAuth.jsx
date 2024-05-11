import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, form, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { Navigate } from 'react-router-dom';



const EditAuth = () => {

  const initialValues={
    fname:"",
    lname:"",
    email:"",
    phone:"",
}

const {id}=useParams()
console.log(id)

const NaviGate= useNavigate()

const [Author, SetAuthor] = useState(initialValues)

const inputChangeHandler=(event)=>{
  const {name, value}=event.target
  SetAuthor({...Author,[name]:value})
  console.log(Author)
}


useEffect(()=>{
axios({
  method:"get",
  url:`http://localhost:5000/author/getonerouter/${id}`
}).then((response)=>{
  SetAuthor(response.data)
}).catch((error)=>{
console.log(error)
})
},[id])


    const isNonMobile = useMediaQuery("(min-width:600px)");

 const FormSubmitHandler = async(e)=>{

  e.preventDefault()
  const response = await axios.put(`http://localhost:5000/author/updaterouter/${id}`,Author)
   console.log("auth res",response)
  .then((response)=>{
   console.log(response)


   toast.success("Author added successfull",{position:"top-right"})

   
   NaviGate("/team")
  }).catch((error)=>{console.log(error)})

 }

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
          label="First Name"
          sx={{ gridColumn: "span 2" }}
          name="fname"

     onChange={inputChangeHandler}
     value={Author.fname}   
        />
  


        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Last Name"
          sx={{ gridColumn: "span 2" }}
          
          name="lname"
               onChange={inputChangeHandler}
               value={Author.lname}   
    
        />

        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Email"
          sx={{ gridColumn: "span 2" }}
      
          name="email"
               onChange={inputChangeHandler}
               value={Author.email}   


        />

        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="phone Number"
          sx={{ gridColumn: "span 2" }}

          name="phone"
               onChange={inputChangeHandler}
               value={Author.phone}   
 
        />

      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained" NaviGate>
      Add New Author
        </Button>
      </Box>
    </form>
 

</Box>
  )
}

export default EditAuth