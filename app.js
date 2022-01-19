// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
// import { initializeApp } from './firebase/app';

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

import{getDatabase, ref, get, set, child, update, remove, onValue, onChildAdded, onChildChanged, onChildRemoved}
from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

;
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
var showall = document.getElementById("ShowAll");

// insert function
function insertData(){
    set(ref(db,"TheStudents/"+rollbox.value),{
        NameOfStd: namebox.value,
        RollNO: rollbox.value,
        Section: secbox.value,
        Gender: genbox.value
        
    })
    .then(()=>{
        location.reload(); 
        // alert("data stored successfully");
       
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

            let name = snapshot.val().NameOfStd;
            let rollNo = rollbox.value
            let sec = snapshot.val().Section;
            let gen = snapshot.val().Gender;

            showIteminList(name, rollNo,sec,gen)
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
        // alert("data update successfully");
        location.reload();
        
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
        location.reload();
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}

let stdNo = 0;
function removeAll(){
    document.getElementById("lists").innerHTML = "";
}
function showIteminList(name, rollNo,sec,gen){
    removeAll()
    addItemToList(name, rollNo,sec,gen)
}
function addItemToList(name, rollNo,sec,gen){
    console.log(name,rollNo,sec,gen)
    var ul = document.getElementById('lists');
    var header = document.createElement('h2');

    var _name = document.createElement('li');
    var _rollNo = document.createElement('li');
    var _sec = document.createElement('li');
    var _gen = document.createElement('li');

    header.innerHTML = 'Student-'+(++stdNo);


    // _name.innerHTML = 'Name';
    // _rollNo.innerHTML = 'Name';
    // _sec.innerHTML = 'Name';
    // _gen.innerHTML = 'Name';

    _name.innerHTML = 'Name: '+name;
    _rollNo.innerHTML = 'RollNO: '+rollNo;
    _sec.innerHTML = 'Section: '+sec;
    _gen.innerHTML = 'Gender : '+gen;
    
    ul.appendChild(header);
    ul.appendChild(_rollNo);
    ul.appendChild(_name);    
    ul.appendChild(_sec);
    ul.appendChild(_gen);

}


function FetchAllData(){
    
    const dbRef = ref(db, 'TheStudents/');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;            

            let name = childSnapshot.val().NameOfStd;
            let rollNo = childSnapshot.val().RollNO;
            let sec = childSnapshot.val().Section;
            let gen = childSnapshot.val().Gender;
            

            addItemToList(name, rollNo,sec,gen)
            // window.addEventListener('load',FetchAllData)
        });
    }, {
    onlyOnce: true
    });
    
}
// assign to btn
insBtn.addEventListener('click',insertData);
selBtn.addEventListener('click',selectData);
updBtn.addEventListener('click',updateData);
delBtn.addEventListener('click',deleteData);
showall.addEventListener('click',FetchAllData);

window.addEventListener('load',FetchAllData)
