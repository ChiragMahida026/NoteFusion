import "./Datatable.css";
import "./datatable.scss";
import InputLabel from "@mui/material/InputLabel";
import SendIcon from "@mui/icons-material/Send";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  DataGrid,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  Button,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

//ADD COLUMN IN DATATABLE [ADD NEW COLUMN HERE IN DATATABLE]
const columns = [
  {
    field: "project_name",
    headerName: "Project Name",
    resizable: true,
    width: 200,
  },
  {
    field: "environment_type",
    headerName: "Environment Type",
    resizable: true,
    width: 200,
  },
  {
    field: "servicename",
    headerName: "Service Name",
    resizable: true,
    width: 200,
  },
  { field: "Type", headerName: "Technology", resizable: true, width: 200 },
  {
    field: "environment",
    headerName: "Envionment",
    resizable: true,
    width: 200,
  },
  { field: "Port", headerName: "Port", resizable: true, width: 200 },
  { field: "Command", headerName: "Command", width: 200 },
];

const Datatable = () => {
  const theme = createTheme();
  //CONFIG VARIABLE TO GET THE TOKEN FROM VARIABLE
  const config = {
    headers: {
      authorization: "Bearer" + " " + localStorage.getItem("token"),
    },
  };

  //GIVE THE ALL USESTATE AND USEEFFECT IN HERE
  const [fromData, setFormData] = useState({
    project_name: "",
    environment_type: "",
  });
  const [user123, setUser12] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [age, setAge] = useState("");
  const [query, setquery] = useState("");
  const { project_name, environment_type } = fromData;

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onChange = (e) =>
    setFormData(
      { ...fromData, [e.target.name]: e.target.value },
      { ...age, [e.target.name]: e.target.value }
    );

  let save = async (e) => {
    e.preventDefault();

    const newUser = {
      project_name,
      age,
      environment_type,
    };

    //DATATABLE SEARCH FUNCTIONALLITY IN DROPDOWN WE HAVE TO SELECT THE VALUE OF PROJECT NAME AND ENVIORMENET(dev,qa..)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
      };

      axios
        .get(
          "api/notes?project_name=" +
            newUser.age +
            "&environment_type=" +
            newUser.environment_type,
          config
        )
        .then((response) => {
          setIsLoaded(true);
          setRowData(response.data);
        });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  //CALL THE API FOR DYNAMIC DROPDOWN LIST COME FROM DATABASE

  const fetchData = () => {
    axios.get("api/notes/project", config).then((res) => {
      setUser12(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  //IMPLEMENTED THE DELETE FROM DATABASE AND SWEETALERT INMPLEMENT
  const handleDelete = (service_id) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: ["No, cancel it!", "Yes, I am sure!"],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        swal({
          title: "Shortlisted!",
          text: "Candidates are successfully shortlisted!",
          icon: "success",
        }).then(function () {
          axios.delete(`api/notes/${service_id}`, config).then((res) => {
            window.location.reload();
          });
        });
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  // const handleedit = (service_id) => {};

  //ACTIONCOLUMN OF DELETE AND VIEW BUTTON
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              style={{ textDecoration: "none" }}
              onClick={() => {
                navigator.clipboard.writeText(params.row.Command);
              }}
            >
              Copy
            </div>
            <div>
              <Link
                to="/notes/edit"
                className="viewButton"
                style={{ color: "blueviolet" }}
              >
                Edit {localStorage.setItem("idofnotes", params.row._id)}
              </Link>
            </div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  //FUNCTION OF CUSTOME MENUBAR AT DATATABLE
  function MyExportButton() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  //FUNCTION OF CUSTOME PAGEINATION AT DATATABLE SIDE
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  //STYLEGRIDOVERLAY AT THE DATATABLE SIDE CUSTOME UI
  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));
  //FUNCTION OF CUSTOME ROWSOVERLAY AT DATATABLE SIDE
  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Rows</Box>
      </StyledGridOverlay>
    );
  }

  return (
    <div className="datatable">
      <div
        className="datatableTitle"
        style={{
          color: "darkslateblue",
          fontFamily: "initial",
          textDecorationLine: "underline",
        }}
      >
        ServiceName
        <Link to="/notes/add" className="link">
          Add New Service
        </Link>
      </div>

      <div style={{ marginLeft: "25%", marginRight: "25%", width: "50%" }}>
        <form
          method="post"
          onSubmit={save}
          style={{ marginBottom: "20px", display: "flex" }}
        >
          <Stack direction="row" spacing={2}>
            <Box sx={{ minWidth: 230 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Project Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Project Name"
                  onChange={handleChange}
                >
                  <MenuItem disabled value="">
                    <em>Select ProjectName</em>
                  </MenuItem>
                  {user123.map((obj) => (
                    <MenuItem key={obj.id} value={obj.project_name}>
                      {obj.project_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 230 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Environment Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="environment_type"
                  value={environment_type}
                  label="environment_type"
                  onChange={(e) => onChange(e)}
                >
                  <MenuItem disabled value="">
                    <em>Select Enviorment</em>
                  </MenuItem>
                  <MenuItem value={"dev"}>DEV</MenuItem>
                  <MenuItem value={"qa"}>QA</MenuItem>
                  <MenuItem value={"stage"}>STAGE</MenuItem>
                  <MenuItem value={"prod"}>PROD</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <IconButton aria-label="add to shopping cart">
              <Button name="Submit" value="Submit" type="submit">
                <SendIcon />
              </Button>
            </IconButton>
          </Stack>
        </form>
      </div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          components={{
            Toolbar: MyExportButton,
            Pagination: CustomPagination,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          // pagination
          className="datagrid"
          rows={rowData}
          getRowId={(row) => row._id}
          id="_id"
          columns={columns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default Datatable;
