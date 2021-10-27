import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../../css/register.css';
import db from '../firebase';
import Loader from '../Loader/Loader';



function Login (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [load, setload] = useState(false);

    const loading =  () =>{
        if (load) {
            return <Loader/>;
        } else {
            return <h1></h1>;
        }
    };


    const login = async (e) => {
        e.preventDefault();
        setload(true);
       setTimeout(()=>{
            if (email && password) {
                db.collection('signin').onSnapshot((snapshot) => {
                    snapshot.docs.map((doc) => {
                       
                        if (doc.data().email === email) {
                            if (doc.data().password === password) {
                                setload(false);
                                props.history.push({
                                    pathname: '/home',
                                    state: { email: '', login: email },
                                });
    
                            } else {
                                setload(false);
                                window.alert('Wrong Password');
                            }
                        }
                        setload(false);
                    });
                });
            }
            setload(false);
        },1000);
    };

    const showpassword = () => {
        var x = document.getElementById('password');
        if (x.type === 'password') {
            x.type = 'text';
        } else {
            x.type = 'password';
        }
    };
    return (
        <form className = "login_signup_box_select">
            <div className = "username">
                <h4>
                    Email
                </h4>
                <input type = "text" onChange = {(e) => setEmail(e.target.value)}/>
            </div>
            <div className = "password">
                <h4>Password<input type = "checkbox" onClick = {() => showpassword()}/></h4>
                <input type = "password" id = "password" onChange = {(e) => setPassword(e.target.value)}/>
            </div>
            <div className = "button">
                <button onClick = {login}>Continue</button>
            </div>
            {loading()}
        </form>
    );
}

export default withRouter(Login);
