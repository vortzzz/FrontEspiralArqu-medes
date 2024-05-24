//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginDoctor/LogIn.html";
  }
  else{
    userJSON=JSON.parse(userJSON);
  }


const patientName = document.getElementById('doctorInputName');
const patientEmail = document.getElementById('doctorInputEmail');
const patientCC = document.getElementById('doctorInputCC');
const patientPhone = document.getElementById('doctorInputPhone');
const addButton = document.getElementById('addButton');
const button_exit = document.getElementById('button_exit');
const button_measurements = document.getElementById('button_measurements');
const button_home= document.getElementById('button_home');
//Eventos
addButton.addEventListener('click',addPatient);
button_exit.addEventListener('click',exit);
button_measurements.addEventListener('click', measurement); 
button_home.addEventListener('click', home);
button_patients.addEventListener('click',patients);


//Funciones
function exit(){
    window.location.href = "../LoginDoctor/Login.html"
    window.localStorage.removeItem('user');
}
function measurement(){
    location.href='../PaginaPrincipalMedicion/Meditions.html';
}
function home(){
    location.href='../PrincipalPageDOCTOR/indexPagePrincipalDoctor.html';
}

function patients(){
    location.href='../PagPpalPacientes/PaginaPacientes.html';
}


function addPatient() {

    let name = patientName.value;
    let email = patientEmail.value;
    let cc = patientCC.value;
    let phone = patientPhone.value;
    
    if(name===""|| cc===""|| email==="" ||phone===""){
        alert("Digite todos los campos, por favor")
    } else{
    let patient  = {
        name: name, 
        cc : cc,
        email : email,
        phone : phone,
       }

    postPatientAdd(patient);
    }
}

async function postPatientAdd(patientAdd){
    let json = JSON.stringify(patientAdd);

    let response = await fetch('http://localhost:8080/patient/create/'+userJSON.id,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: json
    });
    let patient = await response.json();
    alert(patient.description);
    //Actualizo
    window.location.href = "RegistrarPaciente.html";
}



