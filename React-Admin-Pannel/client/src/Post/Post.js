import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from "@mui/material";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { DeletePost, getdata } from "../Store/PostSlice";

const Post = () => {

  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //const [selectedPost, setSelectedPost] = useState([]);
  const dispatch = useDispatch();
  console.log("dispatch", dispatch);
  
    const PostData = useSelector((state) => state.PostR.PostData);
  
    // const PostData = useSelector((state) => state.PostData);
  
  console.log("Data is", PostData);





  const onDeleteHandler = (event, rowData) => {
    const postId = rowData.id;
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        dispatch(DeletePost(postId));
        
      }
      Swal.fire({
        icon: 'Delete',
        title: 'Post is deleted',
      })

      dispatch((getdata()))
    });
  };

  useEffect(() => {
    dispatch(getdata());
    console.log("getData", getdata);
  }, []);
  

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 0.8,
      cellClassName: "name-column--cell"
    },
    {
      field: "description",
      headerName: "Description",

      headerAlign: "left",
      align: "left",
      flex: 0.8
    },
 
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            {/* <Button
              onClick={(e) => handleClickOpen(e, params.row)}
              variant="contained"
            >
              Delete
            </Button> */}

            <Button variant="contained" sx={{ ml: "10px" }}>
              {" "}
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to={`/Editpost/` + params.row._id}
              >
                Update
              </NavLink>
            </Button>
            
            {/* <Button onClick={(e) => onDeleteHandler(e, params.row)} variant="contained"> */}

            
            
            <Button  style={{ color: "white", textDecoration: "none" }} variant="contained" sx={{ ml: "10px" }} onClick={(e) => onDeleteHandler(e, params.row)} >
              {" "}
              Delete
            </Button>

           
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }} />
          </Box>
        );
      }
    }
  ];

  // Define a getRowId function to specify a custom id


  const generateUniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const getRowId = (row) => row._id || generateUniqueId();
  console.log("get row id is -",getRowId)




  return (
    <>
      {/* Dialogue box start */}
      <Dialog
        // open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={deleteRowHandle} color="primary" autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>

      {/* Dialogue end */}

      <Box m={"20px"}>
        <Header title={"AUTHOR"} subtitle={"Managing the Authors"} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button variant="contained" color="primary">
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to={"/Addpost"}
            >
              Add
            </NavLink>
          </Button>
        </div>

        <Box
          m={"10px 0 0 0"}
          height={"70vh"}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none"
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300]
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400]
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700]
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`
            }
          }}
        >
        
          <DataGrid

            rows={PostData.map((row) => ({ ...row, id: getRowId(row) }))}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Box>
      </Box>
    </>
  );
};

export default Post;
