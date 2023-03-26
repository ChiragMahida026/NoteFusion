import "./new.scss";
import "./new.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const New = ({ inputs, title }) => {
  const [fromData, setFormData] = useState({
    project_name: "",
  });
  const { project_name } = fromData;

  const onChange = (e) =>
    setFormData({ ...fromData, [e.target.name]: e.target.value });

  let save = async (e) => {
    e.preventDefault();

    const newUser = {
      project_name,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
      };
      const body = JSON.stringify(newUser);

      // window.location.href = "/";
      swal({
        title: "Are you sure?",
        text: "You will not be able to delete this Project Name!",
        icon: "warning",
        buttons: ["No, cancel it!", "Yes, I am sure!"],
        dangerMode: true,
      }).then(function (isConfirm) {
        if (isConfirm) {
          swal({
            title: "Congratulations!",
            text: "Project Name are successfully add!",
            icon: "success",
          }).then(function () {
            axios.post("api/notes/project", body, config).then((res) => {
              window.location.reload();
            });
          });
        } else {
          swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
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
              <input
                type="text"
                className="form__input"
                id="project_name"
                placeholder="Enter New ProjectName"
                name="project_name"
                value={project_name}
                required
                onChange={(e) => onChange(e)}
              />
              <label className="form__label">New ProjectName</label>
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
