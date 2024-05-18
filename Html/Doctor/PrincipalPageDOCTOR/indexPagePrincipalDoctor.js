const button_exit = document.getElementById('button_exit');
const button_measurements = document.getElementById('button_measurements');
const button_home= document.getElementById('button_home');
const button_patients = document.getElementById('button_patients');


//Eventos
button_exit.addEventListener('click',exit);
button_patients.addEventListener('click',patients);
button_measurements.addEventListener('click', measurement); 

function exit(){
    window.location.href = "../LoginDoctor/Login.html"
    window.localStorage.removeItem('user');
}

function patients(){
    location.href='../PagPpalPacientes/PaginaPacientes.html';
}
function measurement(){
    location.href='../PaginaPrincipalMedicion/Meditions.html';
}
