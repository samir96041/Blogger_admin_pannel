import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// getPostData

export const getdata = createAsyncThunk(

  "getPost", async (data, { rejectWIthValue }) => {
    // console.log("Api data", data)
    try {
    const response = await axios.get("http://localhost:5000/post/getrouter");
    console.log("get Response", response);

      const result = await response.data;
      // console.log("result", result);
      return result;
    } catch (error) {
      return rejectWIthValue(error);
    }
  }
);

export const AddPostData = createAsyncThunk(
  "AddPost",
  async (addPostInputData, { rejectWithValue }) => {
    // console.log("------ inside addPostInputData---------");
    // console.log(addPostInputData);
    try {
      const response = await axios.post(
        "http://localhost:5000/post/addrouter",
        addPostInputData,
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );
      console.log("response",response)
      addPostInputData.id = response.data.insertId;
      console.log("addPostInputData.id",response.data.insertId)
      return addPostInputData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const DeletePost = createAsyncThunk(
    'DeletePost',
    async (postID, { rejectWithValue }) => {
      console.log("postID", postID)
        try {
            const response = await axios.delete(`http://localhost:5000/post/deleterouter/${postID}`);
            console.log("deleted response",response)
            const result  =  response.data
            console.log("deleted result",result)
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateData = createAsyncThunk(
  "updateData",
  async ({ ID, data }, { rejectWithValue }) => {
    console.log("ID is",ID)
    try {
      const response = await axios.put(
        `http://localhost:5000/post/putrouter/${ID}`,
        data
      );
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const Postreducer = createSlice({
  name: "PostR",
  initialState: {
    PostData: [],
    IsAdding: false,
    error: null
    
  },
  reducers: {},

  extraReducers: builder => {
    // addData

    builder.addCase(AddPostData.pending,(state, action)=>{
        state.loading=true
    })
    builder.addCase(AddPostData.fulfilled, (state, action)=>{
    console.log(action.payload);
        console.log('-------state authData-------');
        console.log(state.PostData);
        state.PostData.push(action.payload);
        state.IsAdding = false;
    })
    builder.addCase(AddPostData.rejected,(state, action)=>{
             state.loading = false;
        state.error = action.payload ? action.payload.message : 'An error occurred';
    })

//  getData

    builder.addCase(getdata.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getdata.fulfilled, (state, action) => {
      state.PostData = action.payload;
      state.loading = false;
    });
    

    builder.addCase(getdata.rejected, (state, action) => {
      state.error = action.payload
        ? action.payload.message
        : "an error occured";
    });



    //deletedata

    builder.addCase(DeletePost.pending,(state,action)=>{
      state.loading= true
    })

    builder.addCase(DeletePost.fulfilled,(state, action)=>{
      state.loading = false;
      console.log("Action", action)
      state.PostData = state.PostData.filter((post) => post.id !== action.meta.postID);
      console.log("State.Postdata",state.PostData)
    })
  

    builder.addCase(DeletePost.rejected,(state, action)=>{
      state.error = action.payload
      ? action.payload.message
      : "an error occured";

    })

    //updateData
    
    builder.addCase(updateData.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateData.fulfilled, (state, action) => {
      state.loading = false;
      state.PostData = state.PostData.map((ele)=>(
        ele.id===action.payload.id ? action.payload:ele
      ))
    });
    

    builder.addCase(updateData.rejected, (state, action) => {
      state.error = action.payload
        ? action.payload.message
        : "an error occured";
    });
  
  }
});



export default Postreducer.reducer;
