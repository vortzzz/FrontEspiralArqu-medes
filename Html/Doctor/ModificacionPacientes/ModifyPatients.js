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
const newPatientCC = document.getElementById('newPatientCC');
const newPatientEmail= document.getElementById('newPatientEmail');
const newPatientPhone = document.getElementById('newPatientPhone');
const modifyButton = document.getElementById('modifyButton');
const doneButton = document.getElementById('doneButton');

modifyButton.addEventListener("click", modify);

doneButton.addEventListener("click",done)


getInfo();

function getInfo(){
    newPatientName.value=patientJSON.name;
    newPatientCC.value=patientJSON.cc;
    newPatientEmail.value=patientJSON.email;
    newPatientPhone.value=patientJSON.phone;
}

function done(){
    location.href = "../BusquedaPacientes/IndexSearchFilter.html";
}

function modify(){
    if(newPatientName.value===""||newPatientCC.value===""||newPatientEmail===""||newPatientPhone===""){
        alert("Fill all fields please")
    }
    else{
        let patient  = {
            name: newPatientName.value, 
            cc : newPatientCC.value,
            email : newPatientEmail.value,
            phone : newPatientPhone.value,
            doctorId : patientJSON.doctorId  
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

