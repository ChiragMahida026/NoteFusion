import * as React from "react";
import Avatar from "@mui/material/Avatar";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
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
import swal from "sweetalert";

const New = ({ inputs, title }) => {
  const theme = createTheme();
  const fetchData = () => {
    const config = {
      headers: {
        authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    };

    axios
      .get("/api/notes/" + localStorage.getItem("idofnotes"), config)
      .then((res) => {
        setprojectname(res.data.project_name);
        setenvironmenttype(res.data.environment_type);
        settype(res.data.Type);
        setservicename(res.data.servicename);
        setenvironment(res.data.environment);
        setport(res.data.Port);
        setcommand(res.data.Command);
      });
    //initialize datatable
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [projectnames, setprojectname] = useState("");
  const [environment_type, setenvironmenttype] = useState("");
  const [Type, settype] = useState("");
  const [servicename, setservicename] = useState("");
  const [environment, setenvironment] = useState("");
  const [Port, setport] = useState("");
  const [Command, setcommand] = useState("");

  let save = async (e) => {
    e.preventDefault();

    const updatenames = {
      projectnames,
      environment_type,
      Type,
      servicename,
      environment,
      Port,
      Command,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
      };
      const body = JSON.stringify(updatenames);
      const res = await axios.put(
        "/api/notes/" + localStorage.getItem("idofnotes"),
        body,
        config
      );
      if (res.status === 200) {
        swal({
          title: "Success",
          // text: "I will close in 2 seconds.",
          timer: 1000,
          icon: "success",
          // @ts-ignore
          button: false,
        });
        window.setTimeout(function () {
          // Move to a new location or you can do something else
          window.location.href = "/";
        }, 2000);
      } else {
        //put alert
      }
    } catch (err) {
      console.error(err.response.data);
    }
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
                  <BuildCircleIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                  Update Service
                </Typography>
                <form method="post" onSubmit={save} className="form__content">
                  <Box noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <TextField
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={projectnames}
                              readonly
                              disabled
                              onChange={(e) => setprojectname(e.target.value)}
                            ></TextField>
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
                              onChange={(e) =>
                                setenvironmenttype(e.target.value)
                              }
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
                              onChange={(e) => settype(e.target.value)}
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
                          onChange={(e) => setservicename(e.target.value)}
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
                          onChange={(e) => setenvironment(e.target.value)}
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
                          onChange={(e) => setport(e.target.value)}
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
                          onChange={(e) => setcommand(e.target.value)}
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
                      Update
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
