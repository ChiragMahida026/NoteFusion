import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const New = ({ inputs, title }) => {
  const theme = createTheme();
  const [user123, setUser12] = useState([]);
  const [project_name, setAge] = useState("");
  const fetchData = () => {
    const config = {
      headers: {
        authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    };

    axios.get("/api/notes/project", config).then((res) => {
      setUser12(res.data);
    });
    //initialize datatable
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [fromData, setFormData] = useState({
    environment_type: "",
    servicename: "",
    Type: "",
    Port: "",
    Command: "",
    environment: "",
  });
  const { environment_type, servicename, Type, Port, Command, environment } =
    fromData;

  const onChange = (e) =>
    setFormData(
      { ...fromData, [e.target.name]: e.target.value },
      { ...project_name, [e.target.name]: e.target.value }
    );
  let save = async (e) => {
    e.preventDefault();

    const newUser = {
      project_name,
      environment_type,
      servicename,
      Type,
      Port,
      Command,
      environment,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
      };
      const body = JSON.stringify(newUser);

      const res = await axios.post(
        "/api/notes",
        body,
        config
        // window.localStorage.setItem("keys", user123[0].project_name)
      );
      if (res.status === 200) {
        window.location.href = "/";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{ minWidth: 667 }}>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <SettingsSuggestIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add New Service
                </Typography>
                <form method="post" onSubmit={save} className="form__content">
                  <Box noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Project Name
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={project_name}
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
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Environment
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
                      </Grid>
                      <Grid item xs={12}>
                        <Box>
                          <FormControl fullWidth sx={20}>
                            <InputLabel id="demo-simple-select-label">
                              Project Technology
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name="Type"
                              value={Type}
                              label="Type"
                              onChange={(e) => onChange(e)}
                            >
                              <MenuItem disabled value="">
                                <em>Select Project Technology</em>
                              </MenuItem>
                              <MenuItem value="Node">Node</MenuItem>
                              <MenuItem value="JAVA">JAVA</MenuItem>
                              <MenuItem value="Dotnet">Dotnet</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Service Name"
                          type="text"
                          id="servicename"
                          name="servicename"
                          value={servicename}
                          required
                          onChange={(e) => onChange(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Environment Name[nut,int]"
                          type="text"
                          id="environment"
                          name="environment"
                          value={environment}
                          required
                          onChange={(e) => onChange(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="number"
                          // autoComplete="shipping postal-code"
                          label="Port Number"
                          id="Port"
                          name="Port"
                          value={Port}
                          required
                          onChange={(e) => onChange(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Command"
                          type="text"
                          id="Command"
                          name="Command"
                          value={Command}
                          required
                          onChange={(e) => onChange(e)}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      name="Submit"
                      value="Submit"
                      type="submit"
                      fullWidth
                      variant="contained"
                      id="Send"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default New;
