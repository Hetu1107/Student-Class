import React, { useEffect, useState } from "react";
import db, { storage } from "../firebase";

function UserInfo(props) {
  const [username, setUsername] = useState("");
  const [src, setSrc] = useState(
    "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
  );

  useEffect(async () => {
    await new Promise(function (resolve, reject) {

        db
          .collection("batch")
          .doc("pciH9dYco14ZdT8EghcX")
          .collection("user")
          .onSnapshot((snap) => {
            snap.docs.map((doc) => {
              if (doc.data().email === props.email) {
                if (doc.data().username === "") {
                  document.getElementById("home-page-user-info").style.display =
                    "flex";
                } else {
                  document.getElementById("home-page-user-info").style.display =
                    "none";
                    resolve(true);
                }
              }
            });
          })
    });
  });

  const save = (e) => {
    e.preventDefault()
    document.getElementById("home-page-user-info").style.display = "none";
    db.collection("batch")
      .doc("pciH9dYco14ZdT8EghcX")
      .collection("user")
      .onSnapshot((snap) => {
        snap.docs.map((doc) => {
          if (doc.data().email === props.email) {
            db.collection("batch")
              .doc("pciH9dYco14ZdT8EghcX")
              .collection("user")
              .doc(doc.id)
              .update({
                url: src,
              })
              .then(() => {
                console.log("works");
              })
              .catch((err) => {
                alert(err);
                console.log(err);
              });
            db.collection("batch")
              .doc("pciH9dYco14ZdT8EghcX")
              .collection("user")
              .doc(doc.id)
              .update({
                username: username,
              });
          }
        });
      });
  };

  const changeUrl = async (e) => {
    props.lodiing(true);
    const file = e.target.files[0];
    if (file) {
      document.getElementById("blah").src = URL.createObjectURL(file);
      await new Promise(function (resolve, reject) {
        const uploadTask = storage
          .ref(`images/${e.target.files[0].name}`)
          .put(e.target.files[0]);
        resolve(
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (error) => {
              console.log(error);
            },
            () => {
              storage
                .ref("images")
                .child(e.target.files[0].name)
                .getDownloadURL()
                .then((url) => {
                  console.log(url);
                  setSrc(url);
                  console.log(props.email);
                  // console.log(props.id);
                  props.lodiing(false);
                })
                .catch((err) => {
                  props.lodiing(true);
                  console.log(err);
                });
            }
          )
        );
      });
    }
  };
  return (
    <div className="home-page-user-info" id="home-page-user-info">
      <form className="home-page-user-info-box" onSubmit={(e)=>save(e)}>
        <div className="home-page-user-info-box-avtar">
          <img id="blah" src={src} alt="your image" />
          <input
            accept="image/*"
            type="file"
            id="imgInp"
            onChange={(e) => changeUrl(e)}
          required/>
        </div>
        <div className="home-page-user-info-box-username">
          <h4>Username</h4>
          <input type="text" onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <button className="save-username-and-avtar">
          Save
        </button>
      </form>
    </div>
  );
}

export default UserInfo;
