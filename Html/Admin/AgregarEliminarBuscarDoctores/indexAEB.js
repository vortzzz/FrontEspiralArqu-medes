let userJSON= window.localStorage.getItem('user');



if(userJSON===null){
  window.location.href = "../LoginAdmin/Untitled-1.html";
}

const homeButton = document.getElementById('homeButton');
const exitButton = document.getElementById('exitButton');
const doctorButton = document.getElementById('DoctorButton');
const DeviceButton = document.getElementById('DeviceButton');

homeButton.addEventListener('click', goHome);
exitButton.addEventListener('click', exit);
DeviceButton.addEventListener('click', addDevice);
doctorButton.addEventListener('click',goDoctor);


function exit(){
  window.location.href = "../LoginAdmin/Untitled-1.html"
  window.localStorage.removeItem('user');
}


function goDoctor(){
  window.location.href = "../PageOfDoctor/paginaSearch.html";
}


function goHome(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}

function addDevice() {
  window.location.href = "../CreacionDeDispositvo/Create.html";
}




  