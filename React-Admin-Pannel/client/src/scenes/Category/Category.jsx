import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import Swal from "sweetalert2";

const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "catname",
      headerName: "Category Name",
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
            <Button
              onClick={(e) => handleClickOpen(e, params.row)}
              variant="contained"
            >
              Delete
            </Button>

            <Button variant="contained" sx={{ ml: "10px" }} >
              {" "}
              <NavLink style={{color: "white", textDecoration:"none"}} to={`/EditAuth/`+params.row._id}>Update</NavLink>
            </Button>

            <Typography color={colors.grey[100]} sx={{ ml: "5px" }} />
          </Box>
        );
      }
    }
  ];

  //Axios
  const [catdata, setcatdata] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/catrouter/getcatrouter"
    })
      .then(function (response) {
        // handle success

        console.log(response);
        setcatdata(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  // Define a getRowId function to specify a custom id
  const getRowId = (row) => row._id;

  const [selectedRowId, setSelectedRowId] = useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e, row) => {
    // console.log(row);
    setSelectedRowId(row._id);
    setOpen(true);
  };

  const handleClose = () => {
    console.log("disagree");
    setOpen(false);
  };

  const deleteRowHandle = () => {
    console.log("agree", selectedRowId);
    let authID = selectedRowId;
    console.log(authID);
    setOpen(false);

    let deleteAuthApi = `http://localhost:5000/catrouter/deleterouter/${authID}`;
    axios
      .delete(deleteAuthApi, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(function (response) {
        console.log("----Category deleted-----", response.data);

        Swal.fire({
          icon: "success",
          title: "deleted",
          text: `Auth has been deleted`,
          showConfirmButton: false,
          timer: 1200
        }).then((res) => {
          setcatdata(catdata.filter((auth) => auth._id !== authID));
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <>
      {/* Dialogue box start */}
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={deleteRowHandle} color="primary" autoFocus>
            Agree
          </Button>
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
          <Button variant="contained" color="primary" >
            <NavLink style={{color: "white", textDecoration:"none"}} to={"/AddAuthor2"}>Add</NavLink>
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
            rows={catdata}
            columns={columns}
            getRowId={getRowId}
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

export default Category;
