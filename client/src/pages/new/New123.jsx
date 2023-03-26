import "./new.scss";
import "./new.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [user123, setUser12] = useState([]);
  const [query, setquery] = useState("");

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

  const toObject = Object.assign({}, user123);

  const [fromData, setFormData] = useState({
    project_name: "",
    environment_type: "",
    servicename: "",
    Type: "",
    Port: "",
    Command: "",
    environment: "",
  });
  const {
    project_name,
    environment_type,
    servicename,
    Type,
    Port,
    Command,
    environment,
  } = fromData;

  const onChange = (e) =>
    setFormData({ ...fromData, [e.target.name]: e.target.value });

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
        config,
        window.localStorage.setItem("keys", user123[0].project_name)
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

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="form_for_new">
          <form method="post" onSubmit={save} className="form__content">
            <div className="form__box">
              <select
                className="form__input"
                style={{
                  transform: "translate(-8px, -8px)",
                  padding: "18px 18px 18px",
                }}
                required
                id="dropdown"
                name="project_name"
                value={project_name}
                onChange={(e) => onChange(e)}
              >
                {user123.map((obj) => {
                  return <option value={obj.id}>{obj.project_name}</option>;
                })}
              </select>
              <div className="form__shadow"></div>
            </div>

            <div className="form__box">
              <select
                className="form__input"
                style={{
                  transform: "translate(-8px, -8px)",
                  padding: "18px 18px 18px",
                }}
                required
                name="environment_type"
                value={environment_type}
                onChange={(e) => onChange(e)}
              >
                <option value="" disabled="disabled" selected="selected">
                  Select EnvironmentType
                </option>
                <option value="dev">DEV</option>
                <option value="qa">QA</option>
                <option value="stage">STAGE</option>
                <option value="prod">PROD</option>
              </select>
              <div className="form__shadow"></div>
            </div>

            <div className="form__box">
              <select
                className="form__input"
                style={{
                  transform: "translate(-8px, -8px)",
                  padding: "18px 18px 18px",
                }}
                required
                name="Type"
                value={Type}
                onChange={(e) => onChange(e)}
              >
                <option value="" disabled="disabled" selected="selected">
                  Select ServiceType
                </option>
                <option value="Node">Node</option>
                <option value="JAVA">JAVA</option>
                <option value="Dotnet">Dotnet</option>
              </select>
              <div className="form__shadow"></div>
            </div>

            <div className="form__box">
              <input
                type="text"
                className="form__input"
                id="servicename"
                placeholder="Enter Service Name"
                name="servicename"
                value={servicename}
                required
                onChange={(e) => onChange(e)}
              />
              <label className="form__label">Service Name</label>
              <div className="form__shadow"></div>
            </div>

            <div className="form__box">
              <input
                type="text"
                className="form__input"
                id="environment"
                placeholder="Name[devint,nutdev]"
                name="environment"
                value={environment}
                required
                onChange={(e) => onChange(e)}
              />
              <label className="form__label">Environment Name</label>
              <div className="form__shadow"></div>
            </div>
            <div className="form__box">
              <input
                type="number"
                className="form__input"
                id="Port"
                placeholder="Enter Port Name"
                name="Port"
                value={Port}
                required
                onChange={(e) => onChange(e)}
              />
              <label className="form__label">Port Number</label>
              <div className="form__shadow"></div>
            </div>
            <div className="form__box">
              <input
                type="text"
                className="form__input"
                id="Command"
                placeholder="Enter Command Name"
                name="Command"
                value={Command}
                required
                onChange={(e) => onChange(e)}
              />
              <label className="form__label">Command</label>
              <div className="form__shadow"></div>
            </div>

            <div className="form__button">
              <input
                name="Submit"
                value="Submit"
                type="submit"
                className="form__submit"
                id="Send"
                style={{
                  marginBottom: "3%",
                  backgroundColor: "aquamarine",
                  width: "150px",
                  padding: "10px",
                  border: " none",
                  color: "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
