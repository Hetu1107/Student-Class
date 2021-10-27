import React, { useEffect, useState } from "react";
import db from "../firebase";
import Loader from "../Loader/Loader";
function People(props) {
  const [allPeople, setAllPeople] = useState([]);
  const [load, setload] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const loading = () => {
    if (load) {
      return <Loader />;
    } else {
      return <h1></h1>;
    }
  };
  useEffect(async () => {
      setload(true)
    await new Promise(function (resolve, reject) {
      resolve(
        db
          .collection("batch")
          .doc("96NHjCZ6N4Xffxoi3FgW")
          .collection("user")
          .onSnapshot((snap) => {
            snap.docs.map((doc) => {
              const people = {
                avtar: doc.data().url,
                username: doc.data().username,
              };
              setAllPeople((allPeople) => [...allPeople, people]);
             setTimeout(()=>setload(false),2000) 
            });
          })
      );
    });
  }, [props.email]);

  const showPeopleBox = () =>{
    setload(true);
    props.check(false)
  }
  return (
    <div className="Navbar-people-fixed-box">
      {loading()}
      <div className="people-fixed-box">
        <div
          className="people-fixed-box-head"
          onClick={() => showPeopleBox()}
        >
          <h2>&#x2718;</h2>
        </div>
        <div className="people-fixed-box-people">
          {allPeople.map((res) => {
            return (
              <div className="people-fixed-box-user">
                <img src={res.avtar} />
                <h3>{res.username}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default People;
