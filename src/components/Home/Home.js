import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import "../../css/home.css";
import Loader from "../Loader/Loader";
import db from "../firebase";
import { withRouter } from "react-router-dom";

const data = [
  {
    src: "https://wallpapercave.com/wp/wp5177383.jpg",
    name: "CSE-2020",
    batchName: "CSE",
  },
  {
    src: "https://wallpaperaccess.com/full/536531.png",
    name: "ECE-2020",
    batchName: "ECE",
  },
  {
    src: "https://wallpapercave.com/wp/wp3140229.jpg",
    name: "Both-Batch",
    batchName: "COMMON",
  },
];

function Home(props) {
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [users, setUsers] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [load, setload] = useState(false);

  const loading = () => {
    if (load) {
      return <Loader />;
    } else {
      return <h1></h1>;
    }
  };

  const redirect = (res) => {
    props.history.push({
      pathname: "/main",
      state: {
        batchName: res.batchName,
        userDetails: userDetails,
        id: id,
        src: res.src,
        email: email,
      },
    });
    console.log(imageUrl);
    console.log(res.batchName);
  };

  useEffect(() => {
    if (props.location.state.signup) {
      setEmail(props.location.state.signup);
    } else {
      setEmail(props.location.state.login);
      document.getElementById("home-page-user-info").style.display = "none";
    }
  }, []);

  useEffect(async() => {
      setload(true);
    await new Promise(function (resolve, reject) {
        let docId;
        let batch = 2024;
        resolve(
            
           db.collection("batch").onSnapshot((snap) => {
              snap.docs.map((doc) => {
                if (doc.data().number === batch) {
                  docId = doc.id;
                  setId(docId);
                  console.log(doc.data().number);
                  console.log(id);
                  setload(false);
                }
              })

            })
        )
    });
  }, [email]);

  useEffect(async() => {
      setload(true);
    await new Promise(function (resolve, reject) {
        resolve(
            db.collection("batch")
            .doc(id)
            .collection("user")
            .onSnapshot((snap) => {
              setUsers(snap.docs.map((doc) => doc.data().username));
              snap.docs.map((doc) => {
                if (doc.data().email === email) {
                  console.log(email);
                  setUserDetails(doc.data());
                  console.log(doc.data().username);
                  setImageUrl(doc.data().url);
                }
              });
              console.log(users);
              setload(false);
            })
        )
    });
  }, [id]);

  return (
    <div className="classroom-home-page" id="classroom-home-page">
    {
        loading()
    }
      <NavBar userDetails={userDetails} email={email} loadiing = {setload}/>
      <div className="classroom-home-page-main-div">
        <div className="classroom-home-page-main-div-head">
          <h2>Student Classroom</h2>
        </div>
        <div className="classroom-home-page-main-div-middle">
          {data.map((res) => {
            return (
              <div
                onClick={() => redirect(res)}
                className="classroom-home-page-main-div-middle-box"
                style={{ backgroundImage: `url(${res.src})` }}
              >
                <h2>{res.name}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Home);
