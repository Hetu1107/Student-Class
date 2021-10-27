import React, { useEffect, useState, useRef } from 'react';
import '../../css/register.css';
import { withRouter } from 'react-router-dom';
import db from '../firebase';
import emailjs from 'emailjs-com';
import Loader from '../Loader/Loader';

function Signup (props) {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [code, setCode] = useState();
    const [load, setload] = useState(false);
    const [id, setId] = useState();

    const form = useRef();
    const loading = () => {
        if (load) {
            return <Loader/>
        } else {
            return <h1></h1>;
        }
    };
    const sendEmail = async (e) => {
        e.preventDefault();
        setload(true);
        await emailjs
        .sendForm(
            'service_2ryuebd',
            'template_jgkssph',
            form.current,
            'user_ltxCptfH43Pg32et8yUrw',
        )
        .then(
            (result) => {
                setTimeout(() => {

                }, 3000);
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            },
        );
        setload(false);
        document.getElementById('signup').style.display = 'none';
        document.getElementById('code').style.display = 'flex';
    };
    const codeCheck = () => {
        const actualCode = props.cod;

        if (code.toString() === actualCode.toString()) {
            console.log(actualCode.toString());
            console.log(code.toString());

            db.collection('signup').add({
                email,
                password,
                confirm,
            });

            db.collection('batch').onSnapshot((snap) => {
                snap.docs.map(doc => {
                    if (doc.data().number === 2024) {
                        setId(doc.id);
                        console.log(doc.data().number);
                        console.log(id);
                        db.collection('batch').doc(doc.id).collection('user').add(
                            {
                                batch: 2024,
                                email: email,
                                username: '',
                                url: '',
                            },
                        );
                    }
                });
            });

            db.collection('signin')
            .add({
                email,
                password,
            })
            .then(() => {
                props.history.push({
                    pathname: '/home',
                    state: { signup: email },
                });
            });
        } else {
            alert('wrong code');
        }
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
        <>
            <form
                className = "login_signup_box_select"
                ref = {form}
                onSubmit = {sendEmail}
                id = "signup"
            >
                <div className = "username">
                    <h4>Email</h4>
                    <input
                        type = "text"
                        name = "message"
                        value = {props.cod}
                        id = "actualcode_input"
                    />
                    <input
                        type = "email"
                        onChange = {(e) => setemail(e.target.value)}
                        name = "user_email"
                    />
                </div>
                <div className = "password">
                    <h4>
                        Password
                        <input type = "checkbox" onClick = {() => showpassword()}/>
                    </h4>
                    <input
                        type = "password"
                        id = "password"
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className = "password">
                    <h4>re-enter Password</h4>
                    <input type = "password" onChange = {(e) => setConfirm(e.target.value)}/>
                </div>
                <div className = "button">
                    <input type = "submit" value = "Create-Profile"/>
                </div>
                {loading()}
            </form>
            <form
                className = "enter_verification_code"
                id = "code"
                onSubmit = {(e) => e.preventDefault()}
            >
                <h3>Check your mail and confirm code here !</h3>
                <input
                    onChange = {(e) => setCode(e.target.value)}
                    value = {code}
                    type = "text"
                />
                <button onClick = {() => codeCheck()}>Confirm</button>
                <div class = "alert" id = "alertbox">
                    <strong>Check</strong> your mail box !!
                </div>
            </form>
        </>
    );
}

export default withRouter(Signup);
