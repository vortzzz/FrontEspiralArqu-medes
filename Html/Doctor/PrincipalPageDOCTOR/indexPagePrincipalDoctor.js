let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginDoctor/logIn.html"; 
  }



const button_exit = document.getElementById('exitButton');
const button_measurements = document.getElementById('measurementButton');
const button_home= document.getElementById('homeButton');
const button_patients = document.getElementById('patientsButton');


//Eventos
button_exit.addEventListener('click',exit);
button_patients.addEventListener('click',patients);
button_measurements.addEventListener('click', measurement); 

function exit(){
    window.location.href = "../LoginDoctor/Login.html"
    window.localStorage.removeItem('user');
}

function patients(){
    location.href='../PagPpalPacientes/PagPpalPacientes.html';
}
function measurement(){
    location.href='../PaginaPrincipalMedicion/PaginaPrincipalMedicion.html';
}
