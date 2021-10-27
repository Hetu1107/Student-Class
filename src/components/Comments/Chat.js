import React, { useEffect, useState } from 'react';
import db from '../firebase';
import firebase from 'firebase';

function Chat (props) {
    const [chatMessage, setChatMessage] = useState([]);
    const [message, setMessage] = useState('');
    useEffect(() => {
        db.collection('batch').doc('96NHjCZ6N4Xffxoi3FgW').collection('post').doc(props.postId).collection('chat').orderBy('timestamp', 'asc').onSnapshot(snap => {
            setChatMessage(snap.docs.map(doc => doc.data()));
        });
    }, [props.postId]);

    useEffect(() => {
        console.log(props.postId);
        console.log(chatMessage);
    }, [chatMessage]);

    const send = (e) => {
        e.preventDefault();
        if (message) {
            console.log(message);
            setMessage('');
            db.collection('batch').doc('96NHjCZ6N4Xffxoi3FgW').collection('post').doc(props.postId).collection('chat').add(
                {
                    author: props.username,
                    message: message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    url: props.url,
                },
            );
           let element =  document.getElementById('chat_view_box');
           element.scrollTop = element.scrollHeight;
            setMessage('');
        }
    };

    return (
        <div className = "after-main-announcement-box-chat-box">

            <div className = "after-main-announcement-box-chat">
                <div className = "after-main-announcement-box-chat-head">
                    <h2>Comments</h2>
                </div>
                <div className = "after-main-announcement-box-chat-view" id="chat_view_box">

                    {chatMessage.length ? chatMessage.map(message => {
                        return (
                            <div className = "after-main-announcement-box-chats">
                                <img src = {message.url}/>
                                <h2 id="Comment_messege">{message.message}</h2>
                            </div>
                        );
                    }) : null}
                </div>

                <form onSubmit = {send} className = "after-main-announcement-box-send">

                    <div className = "after-main-announcement-box-send-input">
                        <input type = "text" value = {message} onChange = {(e) => setMessage(e.target.value)}
                               placeholder = "type here..."/>
                    </div>
                    <div className = "after-main-announcement-box-send-send">
                        <i onClick = {send} className = "fas fa-paper-plane"/>
                        <input type = "submit" hidden value = "Send"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Chat;
