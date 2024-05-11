import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//Add userData
export const createUser =createAsyncThunk(
    "createUser"//Name ,

    ,async(data,rejectWIthValue)=>{
        try{

    const response = await axios.post("http://localhost:5000/user/postuserdata",data)

    console.log(response)
     const result =await response.json
     console.log(result)
     

    return result
  }
 catch(error){
return rejectWIthValue(error)
 }
    }
)


//GET user Data
export const getUser =createAsyncThunk("getUserData",async(data,rejectWIthValue)=>{
   
    try {
        const response = await axios.get("http://localhost:5000/user/getuserdata",data)
        console.log("response is",response)
        const result =await response.data
        console.log("result is",result)
        return result
    } catch (error) {
        return rejectWIthValue(error)
    }
})



export const Userreducer = createSlice({
    name:"Users",
    initialState:{
        userData:[],
        loading:false,
        error:{}
    },
    reducers:{
      
    },
    extraReducers:(builder)=>{


        //getUser

        builder.addCase(getUser.pending,(state,action)=>{
            state.loading=true
        })

        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.userData=action.payload
            state.loading = false
        })
        builder.addCase(getUser.rejected,(state , action)=>{
            state.error =action.payload? action.payload.message:"an error occcured"
        })

     
        builder.addCase(createUser.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(createUser.fulfilled,(state,action)=>{
            state.userData = action.payload
            state.loading = false
        })
        builder.addCase(createUser.rejected,(state,action)=>{
            state.error = action.payload?action.payload.message:"an error ocuures"
        })

      

    }

})

export default Userreducer.reducer