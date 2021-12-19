import React, { useEffect, useState } from "react";
import "../../css/ForgotPass.css";
import Loader from "../Loader/Loader";

// prop.co = code that we have to send to mail of the user
// prop.pr = to set page

function ForgetPass(prop) {
  const [ForgotEmail, setForgotEmail] = useState("");
  const [FoundEmail, setFoundEmail] = useState(true);
  const [load, setload] = useState(false);
  const [FoCode, setFoCode] = useState("");
  const [CodeCheck, setCodeCheck] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const loading = () => {
    if (load) {
      return <Loader />;
    } else {
      return <h1></h1>;
    }
  };
  const showpassword = () => {
    var x = document.getElementById("newpassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  useEffect(() => {
    document.getElementById("forgot_box").style.display = "flex";
    document.getElementById("code_boxx").style.display = "none";
  }, []);
  const checkForgotEmail = () => {
    if (true) {
      document.getElementById("forgot_box").style.display = "none";
      document.getElementById("code_boxx").style.display = "flex";
    } else {
      document.getElementById("forgot_box").style.display = "flex";
      document.getElementById("code_boxx").style.display = "none";
      alert("Sorry Your Email Not Found In Our List");
    }
  };
  const finalCodeCheck = () => {
    if (CodeCheck) {
      return (
        <>
          <div className="forgot_password_box" id="forgot_box">
            <div className="username">
              <h4>Email</h4>
              <input
                type="text"
                value={ForgotEmail}
                onChange={(e) => setForgotEmail(e.target.value.trim())}
              />
            </div>
            <div className="button">
              <button onClick={() => checkForgotEmail()}>Varify</button>
            </div>
            <div className="back_to_login">
              <h3 onClick={() => prop.pr(false)}>Back to Login</h3>
            </div>
          </div>
          <div id="code_boxx">
            <h1>Please Check Your Mail Box and Varify The Code</h1>
            <input
              placeholder="code.."
              onChange={(e) => setFoCode(e.target.value)}
            />
            <div className="button">
              <button
                onClick={() => {
                  if (FoCode == prop.co) {
                    setCodeCheck(false);
                  } else {
                    alert("Please enter valid code");
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
          {loading()}
          {() => checkForgotEmail()}
        </>
      );
    } else {
      return (
        <div className="re_enter_pass">
          <div className="password">
            <h4>
              New Password
              <input type="checkbox" onClick={() => showpassword()} />
            </h4>
            <input
              type="password"
              id="newpassword"
              onChange={(e) => setNewPassword(e.target.value.trim())}
            />
          </div>
          <div className="button">
            <button
              onClick={() => {
                alert("password has been changed");
                prop.pr(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      );
    }
  };
  return <>{finalCodeCheck()}</>;
}

export default ForgetPass;
