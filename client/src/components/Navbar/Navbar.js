import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import "../../css/Nav.css";
import UserInfo from "./UserInfo";
import db, { storage } from "../firebase";
import { withRouter } from "react-router-dom";
import {
  OverlayTrigger,
  Tooltip,
  Modal,
  Button,
  Form,
  Nav,
  Container,
  NavDropdown,
  Navbar,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { findAllByTestId } from "@testing-library/react";

let first = 1;
function NavBar(props) {
  const [allPeople, setAllPeople] = useState([]);

  const [showPeople, setShowPeople] = useState(false);
  const [avatar, setAvatar] = useState();
  const [src, setSrc] = useState("");
  const [username, setUsername] = useState();
  const [drop, setDrop] = useState(false);
  const [userId, setUserId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for people
  const handleClosePeople = () => {
    setShowPeople(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    props.history.push("/");
  };
  const handleShowPeople = () => setShowPeople(true);
  useEffect(async () => {
    props.loadiing(true);
    await new Promise(function (resolve, reject) {
      resolve(
        db
          .collection("batch")
          .doc("pciH9dYco14ZdT8EghcX")
          .collection("user")
          .onSnapshot((snap) => {
            setAllPeople(snap.docs.map((doc) => doc.data()));
            setTimeout(() => props.loadiing(false), 2000);
          })
      );
    });
  }, []);

  useEffect(() => {
    if (userId) {
      db.collection("batch")
        .doc("pciH9dYco14ZdT8EghcX")
        .collection("user")
        .doc(userId)
        .update({
          url: src,
        })
        .then(() => {
          // console.log("works");
        })
        .catch((err) => {
          // console.log(err);
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
              // console.log(error);
            },
            () => {
              storage
                .ref("images")
                .child(e.target.files[0].name)
                .getDownloadURL()
                .then((url) => {
                  setSrc(url);
                  db.collection("batch")
                    .doc("pciH9dYco14ZdT8EghcX")
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
    // console.log(props.userDetails);
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

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" fixed="top" id="navbar">
      <UserInfo email={props.email} lodiing={props.loadiing} />
      <Container>
        <Navbar.Brand id="left_nav">
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
                <Button onClick={logout} variant="danger">
                  Log-Out
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={showPeople}
              onHide={handleClosePeople}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header>
                <Modal.Title>People</Modal.Title>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClosePeople}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Modal.Header>
              <Modal.Body id="people_list_body">
                <ListGroup id="people_list_list" as="ol" numbered>
                  <div>Users online:</div>
                  {props.online.map(on =>{
                    return(
                        <ListGroup.Item
                            as="li"
                        >
                          <div className="flexd">
                            <div className="complete">{on}</div>
                            <div className="end"></div>
                          </div>
                        </ListGroup.Item>
                    )
                  })}
                  <br/>
                  <div>Other Users:</div>
                  {allPeople.map((res) => {
                    if (res.username.trim() !== "") {
                      return (
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{res.username}</div>
                          </div>
                        </ListGroup.Item>
                      );
                    }
                  })}
                </ListGroup>
              </Modal.Body>
            </Modal>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav id="right_nav">
            <Nav.Link onClick={handleShowPeople} className="icons">
              <h4>
                <i className="fas fa-user-friends" />
              </h4>
            </Nav.Link>
            <Nav.Link className="icons">
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
