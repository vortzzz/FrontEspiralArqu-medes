//Autenticacion

let user= window.localStorage.getItem('user');
let patient= window.localStorage.getItem('patient');

if(user===null){
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
const measurementButton = document.getElementById('measurementButton');
const modifyButton = document.getElementById('modifyButton');
const homeButton = document.getElementById('homeButton');
const doneButton = document.getElementById('doneButton');
const exitButton = document.getElementById('exitButton');
const searchBTN = document.getElementById('searchBTN');
const addBTN = document.getElementById('addBTN');

exitButton.addEventListener("click", exit)

measurementButton.addEventListener("click",measurement)

homeButton.addEventListener("click",home)

searchBTN.addEventListener('click', searchPatient);

addBTN.addEventListener('click',addPatient);

function home(){
    location.href='../PrincipalPageDOCTOR/indexPagePrincipalDoctor.html';
}

function measurement(){
    location.href='../PaginaPrincipalMedicion/Meditions.html';
}

function exit(){
    location.href='../LoginDoctor/Login.html';
    window.localStorage.removeItem('user');
}

function searchPatient(){
    location.href='../BusquedaPacientes/IndexSearchFilter.html';
}
function addPatient(){
    location.href='../RegistrarPacientes/RegistrarPaciente.html';
}