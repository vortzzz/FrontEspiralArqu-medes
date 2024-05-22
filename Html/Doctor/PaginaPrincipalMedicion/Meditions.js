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
const modifyButton = document.getElementById('modifyButton');
const homeButton = document.getElementById('homeButton');
const exitButton = document.getElementById('exitButton');
const patientButton = document.getElementById('patientsButton');
const searchBTN = document.getElementById('searchBTN');
const addButton = document.getElementById('addBTN');


exitButton.addEventListener("click", exit)
patientButton.addEventListener('click', patients)
homeButton.addEventListener("click",home)
searchBTN.addEventListener("click",searchMeasurement)
addButton.addEventListener("click", registerMeasurement)

function home(){
    location.href='../PrincipalPageDOCTOR/indexPagePrincipalDoctor.html';
}

function exit(){
    location.href='../LoginDoctor/Login.html';
    window.localStorage.removeItem('user');
}

function patients(){
    location.href='../PagPpalPacientes/PaginaPacientes.html';
}

function searchMeasurement(){
    location.href='../FiltradoMediciones/measurementFilter.html';
}

function registerMeasurement(){
    location.href='../RegistroMedicion/registroMedicion.html';
}


