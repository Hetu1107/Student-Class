import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import People from "./People";
import "../../css/Nav.css";
import UserInfo from "./UserInfo";
import db, { storage } from "../firebase";
import { withRouter } from "react-router-dom";
import { OverlayTrigger, Tooltip, Modal, Button, Form ,Nav,Container,NavDropdown,Navbar } from "react-bootstrap";

function NavBar(props) {
  const [showPeople, setShowPeople] = useState(false);
  const [avatar, setAvatar] = useState();
  const [src, setSrc] = useState("");
  const [username, setUsername] = useState();
  const [drop, setDrop] = useState(false);
  const [userId, setUserId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (userId) {
      db.collection("batch")
        .doc("96NHjCZ6N4Xffxoi3FgW")
        .collection("user")
        .doc(userId)
        .update({
          url: src,
        })
        .then(() => {
          console.log("works");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  const handlebar = async (e) => {
    // console.log("clicked")
    if (e.target.files[0]) {
      props.loadiing(true);
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
                  setSrc(url);
                  db.collection("batch")
                    .doc("96NHjCZ6N4Xffxoi3FgW")
                    .collection("user")
                    .onSnapshot((snap) => {
                      snap.docs.map((doc) => {
                        if (doc.data().email === props.email) {
                          setUserId(doc.id);
                        }
                      });
                    });
                });
              props.loadiing(false);
            }
          )
        );
      });
    }
  };

  useEffect(() => {
    // db.collection('batch').doc('96NHjCZ6N4Xffxoi3FgW').collection('user').onSnapshot(snap => {
    //     snap.docs.map(doc => {
    //         if (doc.data().email === props.email) {
    //             setUsername(doc.data().username);
    //             setAvatar(doc.data().url);
    //         }
    //     });
    // });
    console.log(props.userDetails);
    setUsername(props.userDetails.username);
    setAvatar(props.userDetails.url);
  });

  // user information of avtar and user name to put on navbar
  const user = {
    // avtar image url
    avtar: avatar || "",
    username: username || "",
  };

  // people box function
  const PeopleBox = () => {
    if (showPeople) {
      return <People email={props.email} check={setShowPeople} />;
    } else {
      return null;
    }
  };

  return (
    <Navbar collapseOnSelect  bg="dark" variant="dark" fixed="top" id="navbar">
        <UserInfo email={props.email} lodiing={props.loadiing}/>
        {
          PeopleBox()
        }
      <Container>
        <Navbar.Brand id="left_nav">
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="button-tooltip">Profile</Tooltip>}
          >
            <div className="navbar-profile-box">
              <img src={user.avtar} onClick={handleShow} alt={""} />
              <h4 onClick={handleShow}>{user.username}</h4>
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                  <Modal.Title>Hello {user.username}</Modal.Title>
                  <button
                    type="button"
                    class="close"
                    aria-label="Close"
                    onClick={handleClose}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </Modal.Header>
                <Modal.Body>
                  <div className="modalbody_profile">
                    <Form.Group className="position-relative mb-3">
                      <Form.Label>Change profile image</Form.Label>
                      <Form.Control
                        type="file"
                        required
                        name="file"
                        onChange={handlebar}
                      />
                    </Form.Group>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => props.history.push("/")}
                    variant="danger"
                  >
                    Log-Out
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </OverlayTrigger>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav id="right_nav">
            <Nav.Link onClick={()=>setShowPeople(true)}>
              <h4
                
              >
                <i className="fas fa-user-friends" />
              </h4>
            </Nav.Link>
            <Nav.Link>
              <h4 id="navbar-right-corner-home">
                <i className="fas fa-home" />
              </h4>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(NavBar);
