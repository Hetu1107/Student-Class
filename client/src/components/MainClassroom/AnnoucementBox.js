import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import db from "../firebase";
import Chat from "../Comments/Chat";
import axios from "axios";

function AnnoucementBox(props) {
  const [profile, setProfile] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState([]);
  const [time, setTime] = useState("");

  const userAuthnticated = () => {
    axios
      .get("/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response);
        if (!response.data.auth) {
          props.history.push("/");
        } else {
        }
      });
  };

  useEffect(() => {
    userAuthnticated();
  });

  useEffect(() => {
    db.collection("batch")
      .doc("pciH9dYco14ZdT8EghcX")
      .collection("user")
      .onSnapshot((snap) => {
        // console.log(snap);
        snap.docs.map((doc) => {
          if (doc.data().email === props.location.state?.email) {
            setProfile(doc.data().url);
          }
        });
      });
    db.collection("batch")
      .doc("pciH9dYco14ZdT8EghcX")
      .collection("post")
      .doc(props.location.state?.res.id)
      .get()
      .then((snapshot) => {
        setDetails(snapshot.data());
      });
  }, []);

  useEffect(() => {
    setTime(
      new Date(
        details?.timestamp?.seconds ? details.timestamp.seconds * 1000 : null
      )
        .toString()
        .substring(0, 16)
    );
  }, [details]);

  useEffect(() => {
    setFiles(details?.url);
    // console.log(details);
  }, [details]);

  return (
    <div className="after-main-announcement-box-main">
      <div className="after-main-announcement-box-main-nav">
        <i
          className="fas fa-arrow-left"
          onClick={() => window.history.back()}
        />

        {/* user profile pic  */}
        <img src={profile} />
      </div>
      <div className="after-main-announcement-box-content">
        <div className="after-main-announcement-box-content-head">
          <div>
            <h2>{details?.title}</h2>
          </div>
          <div>
            {/*{console.log(new Date(details.timestamp.seconds * 1000))}*/}
            <h4>
              {details?.author} : Date-{time}
            </h4>
          </div>
        </div>
        <div className="after-main-announcement-box-content-middle">
          <p>{details?.message}</p>
        </div>
        <div className="after-main-announcement-box-content-files">
          <h2>Files</h2>
          {files
            ? files.map((file) => {
                // console.log(file);
                return (
                  <>
                    <div className="after-main-announcement-box-content-files-box">
                      <div className="after-main-announcement-box-content-files-box-left">
                        <h3>{file.fileName}</h3>
                      </div>
                      <div className="after-main-announcement-box-content-files-box-right">
                        <a href={file?.url} target="_blank">
                          <i className="far fa-eye" />
                        </a>
                      </div>
                    </div>
                  </>
                );
              })
            : null}
        </div>
      </div>
      <Chat
        username={props.location.state?.userDetails.username}
        url={props.location.state?.userDetails.url}
        postId={props.location.state?.res.id}
      />
    </div>
  );
}

export default withRouter(AnnoucementBox);
