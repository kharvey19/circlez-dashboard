import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase, ref, child, onValue, get} from 'firebase/database';
// import {
//     getFirestore, collection, onSnapshot,
//     addDoc, deleteDoc, doc,
//     query, where,
//     orderBy, serverTimestamp
//   } from 'firebase/firestore'
  
  const firebaseConfig = {
    apiKey: "AIzaSyBBvUyOMh_eu1YDFjTrBrEagfZCxKz8NJQ",
    authDomain: "circlez-8e1cb.firebaseapp.com",
    projectId: "circlez-8e1cb",
    storageBucket: "circlez-8e1cb.appspot.com",
    messagingSenderId: "399178993682",
    appId: "1:399178993682:web:a14c6aaabf5b9059fcc8cb",
    measurementId: "G-31MGM41YM9"
  };
  firebase.initializeApp(firebaseConfig);
  const db = getDatabase();



  export let stdNo = 0;
  export let tbody = document.getElementById('tbody1');
  

  export function getPremiumUsers(first, last, email, role, other) {
    let trow = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
  
    td1.innerHTML = ++stdNo;
    td2.innerHTML = first;
    td3.innerHTML = last;
    td4.innerHTML = email;
    td5.innerHTML = role;
    td6.innerHTML = other;
  
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
  
    tbody.appendChild(trow);
  }

  
  // function getPremiumUsers(first, last, email, role, other) {
  //   let trow = document.createElement('tr');
  //   let td1 = document.createElement('td');
  //   let td2 = document.createElement('td');
  //   let td3 = document.createElement('td');
  //   let td4 = document.createElement('td');
  //   let td5 = document.createElement('td');
  //   let td6 = document.createElement('td');
  
  //   td1.innerHTML = ++stdNo;
  //   td2.innerHTML = first;
  //   td3.innerHTML = last;
  //   td4.innerHTML = email;
  //   td5.innerHTML = role;
  //   td6.innerHTML = other;
  
  //   trow.appendChild(td1);
  //   trow.appendChild(td2);
  //   trow.appendChild(td3);
  //   trow.appendChild(td4);
  //   trow.appendChild(td5);
  //   trow.appendChild(td6);
  
  //   tbody.appendChild(trow);
  // }
  
  // export function AddAllItemsToTable(theUser) {
  //   stdNo = 0;
  //   tbody.innerHTML = '';
  //   theUser.forEach(user => {
  //     getPremiumUsers(user.firstName, user.lastName, user.Email, user.Role, user.OtherRole);
  //   });
  // }
  
  // function GetAllDataRealtime() {
  //   const dbRef = ref(db, 'Premium');
  
  //   onValue(dbRef, (snapshot) => {
  //     var users = [];
  //     snapshot.forEach((childSnapshot) => {
  //       users.push(childSnapshot.val());
  //     });
  
  //     AddAllItemsToTable(users);
  //   });
  // }
  
  // window.onload = GetAllDataRealtime;
  
  export { firebase, db };