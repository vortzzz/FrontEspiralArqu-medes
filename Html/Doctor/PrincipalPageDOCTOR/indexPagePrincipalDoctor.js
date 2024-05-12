const button_exit = document.getElementById('button_exit');
const button_measurements = document.getElementById('button_measurements');
const button_home= document.getElementById('button_home');
const button_patients = document.getElementById('button_patients');


//Eventos
button_exit.addEventListener('click',exit);
button_patients.addEventListener('click',patientsSection);

function exit(){
    window.location.href = "../LoginDoctor/Login.html"
    window.localStorage.removeItem('user');
}

function patientsSection(){
    window.location.href = "../BusquedaPacientes/indexSearchFilter.html"
}
function measurementSection() {}
