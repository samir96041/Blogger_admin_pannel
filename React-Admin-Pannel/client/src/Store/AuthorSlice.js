import { createSlice } from "@reduxjs/toolkit";


 export const AuthorSlice= createSlice({
    name:"AuthorSlice",
    initialState:{
      authdata:[],
      error:{}

    },
    reducers:{
getAuth:()=>{

  


},
addAuth:()=>{



},
deleteAuth:()=>{



},
updateAuth:()=>{



}
    }
    


 })

 export const {getAuth,addAuth,updateAuth,deleteAuth}=AuthorSlice.actions
 export default AuthorSlice.reducer