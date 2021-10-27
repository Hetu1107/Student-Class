import db, { storage } from '../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import firebase from 'firebase';

export async function newAnnouncement (e, fileUrl) {
    return new Promise((resolve, reject) => {
        console.log('clicked');
        const file = e.target.files[0];
        if (file) {
            const uploadTask = storage
            .ref(`posts/${e.target.files[0].name}`)
            .put(e.target.files[0]);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                    );
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage
                    .ref('posts')
                    .child(e.target.files[0].name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        fileUrl.push(url);
                        resolve(url);
                    }).catch(err => console.log(err));
                },
            );
        }
    });
};

const post = async (title, message, username, url, subject) => {
    const docRef = await db.collection('batch').doc('96NHjCZ6N4Xffxoi3FgW').collection('post').add(
        {
            title: title,
            author: username,
            message: message,
            url: url,
            subject: subject,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

    // console.log(docRef);
};

export default post;
