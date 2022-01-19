// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdsW-yPZzVLZa3Zq2227yq7jGb6akEhmk",
  authDomain: "fire9db-f187a.firebaseapp.com",
  projectId: "fire9db-f187a",
  storageBucket: "fire9db-f187a.appspot.com",
  messagingSenderId: "94486816415",
  appId: "1:94486816415:web:81b045e63a1a7be341e4aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import{getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

const db = getDatabase();

// References
var namebox = document.getElementById("Namebox");
var rollbox = document.getElementById("Rollbox");
var secbox = document.getElementById("Secbox");
var genbox = document.getElementById("Genbox");

var insBtn = document.getElementById("Insbtn");
var selBtn = document.getElementById("Selbtn");
var updBtn = document.getElementById("Updbtn");
var delBtn = document.getElementById("Delbtn");

// insert function
function insertData(){
    set(ref(db,"TheStudents/"+rollbox.value),{
        NameOfStd: namebox.value,
        RollNO: rollbox.value,
        Section: secbox.value,
        Gender: genbox.value
    })
    .then(()=>{
        alert("data stored successfully");
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}


// SELECT DATA 
function selectData(){
   
    const dbref = ref(db);
    get(child(dbref,"TheStudents/"+rollbox.value)).then((snapshot) =>{
        if(snapshot.exists()){
            namebox.value = snapshot.val().NameOfStd;
            secbox.value = snapshot.val().Section;
            genbox.value = snapshot.val().Gender;                      
        }
        else{
            alert("No data dound");
        }
    })
    .catch((error) =>{
        alert("unsuccessful, error"+error);
    });
}

 // UPDATE DATA 
 function updateData(){
    update(ref(db,"TheStudents/"+rollbox.value),{
        NameOfStd: namebox.value,
        // RollNO: rollbox.value, primary
        Section: secbox.value,
        Gender: genbox.value
    })
    .then(()=>{
        alert("data update successfully");
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}

//DELTE
// UPDATE DATA 
function deleteData(){
    remove(ref(db,"TheStudents/"+rollbox.value))
    .then(()=>{
        alert("data delete successfully");
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}

// assign to btn
insBtn.addEventListener('click',insertData);
selBtn.addEventListener('click',selectData);
updBtn.addEventListener('click',updateData);
delBtn.addEventListener('click',deleteData);