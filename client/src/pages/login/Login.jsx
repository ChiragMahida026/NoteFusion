import React from "react";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, login } from "../../features/auth/authSlice";

import "./login.scss";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
    }

    if (isSuccess && user) {
      window.location.href = "/";
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <main class="main">
      <div class="container">
        <section class="wrapper">
          <div class="heading">
            <h1 class="text text-large">LogIn</h1>
          </div>
          <form name="signin" class="form" onSubmit={onSubmit}>
            <div class="input-control">
              <label for="email" class="input-label" hidden>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="input-field"
                placeholder="Email Address"
                required
                value={email}
                onChange={onChange}
              />
            </div>
            <div class="input-control">
              <label for="password" class="input-label" hidden>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                class="input-field"
                placeholder="Password"
                required
                value={password}
                autoComplete="true"
                onChange={onChange}
              />
            </div>
            <div class="input-control" style={{ textAlign: "center" }}>
              {/* <Link to="/forget" style={{ textDecoration: "none" }}>
                <div className="viewButton">Forgot Password</div>
              </Link> */}

              <input
                type="submit"
                name="submit"
                class="input-submit"
                value="Sign In"
              />
            </div>
            {/* <h3>{err}</h3> */}
          </form>
        </section>
      </div>
    </main>
  );
}
export default Login;
