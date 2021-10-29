import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "../../css/register.css";
import db from "../firebase";
import Loader from "../Loader/Loader";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setload] = useState(false);

  const loading = () => {
    if (load) {
      return <Loader />;
    } else {
      return <h1></h1>;
    }
  };

  const userAuthnticated = () => {
    axios
      .get("/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.auth) {
          props.history.push({
            pathname: "/home",
            state: { login: localStorage.getItem("email") },
          });
        }
      });
  };

  useEffect(() => {
    userAuthnticated();
  }, []);

  const login = async (e) => {
    let flag = 0;
    e.preventDefault();
    setload(true);
    setTimeout(() => {
      if (email) {
        db.collection("signin").onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().email === email) {
              flag = 1;
              axios
                .post("/login", {
                  email: doc.data().email,
                  correctPass: doc.data().password,
                  userPass: password,
                })
                .then((response) => {
                  if (response.data.auth) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("email", email);
                    props.history.push({
                      pathname: "/home",
                      state: { email: "", login: email },
                    });
                    setload(false);
                  } else {
                    window.alert("Invalid credentials");
                  }
                });
            }
            setload(false);
          });
          if (flag == 0) {
            window.alert("Invalid Credentials");
          }
        });
      }
      setload(false);
    }, 1000);
  };

  const showpassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <form className="login_signup_box_select">
      <div className="username">
        <h4>Email</h4>
        <input type="text" onChange={(e) => setEmail(e.target.value.trim())} />
      </div>
      <div className="password">
        <h4>
          Password
          <input type="checkbox" onClick={() => showpassword()} />
        </h4>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button">
        <button onClick={login}>Continue</button>
      </div>
      {loading()}
    </form>
  );
}

export default withRouter(Login);
