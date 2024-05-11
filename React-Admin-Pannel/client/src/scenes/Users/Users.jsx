import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Store/UserSlice";


const Users = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch=useDispatch()
  // const[ getData,setdata]=useState([])
  


const userData = useSelector((state)=>state.UserR.userData)
console.log(userData)

useEffect(()=>{
dispatch(getUser())
},)


 

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "fname",
      headerName: "FirstName",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lname",
      headerName: "LastName",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      type: "number",

      headerAlign: "left",
      align: "left",
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "created",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Users"
        subtitle="List of all Users."
      />
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={userData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Users;