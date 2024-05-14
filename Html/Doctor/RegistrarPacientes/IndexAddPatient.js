//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginDoctor/LogIn.html";
  }

const homeButton = document.getElementById('homeButton');
const exitButton = document.getElementById('exitButton');
const patientName = document.getElementById('patientName');
const patientEmail = document.getElementById('patientEmail');
const patientCC = document.getElementById('patientCC');
const patientPhone = document.getElementById('patientPhone');
const addButton = document.getElementById('addButton');


//Eventos
addButton.addEventListener('click',addPatient);
homeButton.addEventListener('click',goHome);
exitButton.addEventListener('click', exit);

function exit(){
    window.location.href = "../LoginDoctor/LogIn.html";
    window.localStorage.removeItem('user');
}

function goHome(){
    window.location.href = "../PrincipalPageDOCTOR/indexPagePrincipalDoctor.html";
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

    let response = await fetch('http://localhost:8080/patient/create',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: json
    });
    let doctor = await response.json();
    alert(doctor.description);
    //Actualizo
    window.location.href = "RegistrarPaciente.html";
}



