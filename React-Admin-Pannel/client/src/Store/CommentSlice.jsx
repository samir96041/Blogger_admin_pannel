import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// getComment
export const getdata = createAsyncThunk(
    "getComment",async (data, {rejectWithvalue})=>{
        console.log("Api data",  data)
        try {
            const response = await axios.get("http://localhost:5000/commentrouter/getcomment")
            console.log("response" ,response)

            const result = await response.data
            return result
            
        } catch (error) {
            return rejectWithvalue(error)
        }
    }
)

//addcomment

export const AddComment = createAsyncThunk(
    "AddComment",async (addCommentData , {rejectWithvalue})=>{
        try {
        const response = await axios.post("http://localhost:5000/commentrouter/addrouter",addCommentData)
        console.log("Response add data", response)


        addCommentData.id = response.data.insertID
        return addCommentData

        } catch (error) {
            console.log(error)
            return rejectWithvalue(error)
        }
    }

    
)


//deleteComment
export const deleteComment= createAsyncThunk(
    "deleteComment", async (commID, {rejectWithvalue})=>{
        try {
            const response = await axios.delete(`http://localhost:5000/commentrouter/deleterouter/${commID}`)

            const result = response.data
            return result
        } catch (error) {
            return rejectWithvalue(error)
        }
    }
)


//update comment
export const updateComment = createAsyncThunk(
    "updateComment", async({ID,data},{rejectWithvalue})=>{
        try {
            const response = await axios.put(`http://localhost:5000/commentrouter/deleterouter/${ID}`,data)

            const result = await response.data
            return result
        } catch (error) {
            return rejectWithvalue(error)
        }
    }
)

export const Commentreducer = createSlice({
    name:"CommentR",
    initialState:{
        CommentData:[],
        IsAdding: false,
        error:null
    },
    reducers:{},

    extraReducers:builder=>{
       //getData
     
        builder.addCase(getdata.pending,(state,action)=>{
            state.loading=true
        })

        builder.addCase(getdata.fulfilled,(state,action)=>{
            state.CommentData = action.payload
            state.loading = false
        })

        builder.addCase(getdata.rejected,(state , action)=>{
            state.error =action.payload? action.payload.message:"an error occcured"
        })


        builder.addCase(AddComment.pending,(state,action)=>{
            state.loading=true
        })

        builder.addCase(AddComment.fulfilled,(state,action)=>{
            state.CommentData.push(action.payload)
            state.IsAdding = false;
        })
        builder.addCase(AddComment.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload ? action.payload.message:'An error occured';
        })


        builder.addCase(deleteComment.pending,(state,action)=>{
            state.loading= true
        })

        builder.addCase(deleteComment.fulfilled, (state,action)=>{
            state.loading = false
            state.CommentData = state.CommentData.filter((post)=>post.id !== action.meta.commID)
        })

        builder.addCase(deleteComment.rejected,(state,action)=>{
            state.error = action.payload
            ? action.payload.message
            : "an error occured";
        })

        builder.addCase(updateComment.pending, (state, action)=>{
            state.loading = false         
        })

        builder.addCase(updateComment.fulfilled, (state,action)=>{
            state.loading = false
            state.CommentData = state.CommentData.map((ele)=>(ele.id = action.payload.id ? action.payload:ele))
        })

        builder.addCase(updateComment.rejected, (state,action)=>{
            state.error = action.payload
            ? action.payload.message
            : "an error occured";
        })
    }

     
    
})
export default Commentreducer.reducer