//Autenticacion

let user= window.localStorage.getItem('user');
let patient= window.localStorage.getItem('patient');

if(user===null||patient===null){
    location.href = "../LoginDoctor/Login.html";
  }
//Convierto string a objeto
else{
    userJSON=JSON.parse(user);
    patientJSON=JSON.parse(patient);
}

const newPatientName = document.getElementById('newPatientName');
const newPatientEmail= document.getElementById('newPatientEmail');
const newPatientPhone = document.getElementById('newPatientPhone');
const modifyButton = document.getElementById('modifyButton');
const homeButton = document.getElementById('homeButton');
const patientsButton = document.getElementById('patientsButton');
const doneButton = document.getElementById('doneButton');
const measurementButton = document.getElementById('measurementButton');

modifyButton.addEventListener("click", modify);

doneButton.addEventListener("click",done)

homeButton.addEventListener("click",home)

measurementButton.addEventListener("click",measurement)

patientsButton.addEventListener("click",patients);

function measurement(){
    location.href='../PaginaPrincipalMedicion/Meditions.html';
}

function home(){
    location.href='../PrincipalPageDOCTOR/indexPagePrincipalDoctor.html';
}

function patients(){
    location.href='../PagPpalPacientes/PaginaPacientes.html';
}

getInfo();

function getInfo(){
    newPatientName.value=patientJSON.name;
    newPatientEmail.value=patientJSON.email;
    newPatientPhone.value=patientJSON.phone;
}

function done(){
    location.href = "../BusquedaPacientes/IndexSearchFilter.html";
    localStorage.removeItem('patient');
}

function modify(){
    if(newPatientName.value===""||newPatientEmail.value===""||newPatientPhone.value===""){
        alert("Fill all fields please")
    }
    else{
        let patient  = {
            name: newPatientName.value, 
            email : newPatientEmail.value,
            phone : newPatientPhone.value,
        }
    
        postPatientModify(patient);
    }

    async function postPatientModify(patient){
    let json = JSON.stringify(patient);
    let response = await fetch('http://localhost:8080/doctor/patient/'+patientJSON.id+'/modify',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: json
    });
    let message = await response.json();    
    alert(message.description);
    }
}

