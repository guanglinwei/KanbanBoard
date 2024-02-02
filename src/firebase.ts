// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, limit, Timestamp, orderBy } from 'firebase/firestore';
import Board from "./models/Board";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIHQ9tjirES9LOQQR8IRk7d631_VWiBRU",
    authDomain: "seoulspiceexercise.firebaseapp.com",
    projectId: "seoulspiceexercise",
    storageBucket: "seoulspiceexercise.appspot.com",
    messagingSenderId: "95844175280",
    appId: "1:95844175280:web:2a585ddea6df54ccc89a75",
    measurementId: "G-HB6NK40FHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const SignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential!.accessToken;
        // const user = result.user;
    }).catch((error) => {
        console.log(error);
    });
};

export const SignOut = () => {
    signOut(auth).then(() => { }).catch((error) => { console.log(error); });
};

export const uploadBoardsToDB = (boards: Board[], user: User) => {
    return addDoc(collection(db, 'users', user.uid, 'userData'), {
        boards: boards,
        uid: user.uid,
        created: new Date(Timestamp.now().seconds * 1000).toISOString()
    });
};

export const getBoardsFromDB = (user: User, callback: ((x: Board[]) => void), wasEmpty: (() => void)) => {
    const userData = collection(db, 'users', user.uid, 'userData');
    const userQuery = query(userData, orderBy('created', 'desc'), limit(1));
    return getDocs(userQuery).then((result) => {
        result.forEach(v => {
            callback(v.data().boards as Board[]);
        });

        if (result.empty) { wasEmpty(); }
    });
};