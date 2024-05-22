//Autenticacion

let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginDoctor/Login.html";
  }
//Convierto string a objeto
else{
    userJSON=JSON.parse(userJSON);
}

const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const exitButton = document.getElementById('exitButton');
const patientsButton = document.getElementById('patientsButton');
const inputFilterByName = document.getElementById('inputFilterByName');
const measurementButton = document.getElementById('measurementButton');
const filterBTN = document.getElementById('filterBTN');
const patientsContainer=document.getElementById('patientsContainer');
const searchBTN= document.getElementById('searchBTN');
const inputSearchByID = document.getElementById('inputSearchByID');

homeButton.addEventListener('click',home)
exitButton.addEventListener('click',exit)
patientsButton.addEventListener("click",patients);
measurementButton.addEventListener('click',measurement)
filterBTN.addEventListener('click',filter)
searchBTN.addEventListener('click',search)

function search(){
    let ccPatient = inputSearchByID.value;
    if(ccPatient != ""){
     getPatientSearch(ccPatient);
    }

}

async function getPatientSearch(ccPatient){
    let response = await fetch("http://localhost:8080/doctor/"+userJSON.id+"/searchPatients/"+ccPatient,{
    method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }, 
    });
    let patient = await response.json();
    if(response.ok){
        patientsContainer.innerHTML = '';
        let table = document.createElement("table");
        table.id = "miTabla";
        var tblBody = document.createElement("tbody");
        var ceilInfo;
        var textoBTN1;
        var textoBTN2;
        var hilera = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var celda = document.createElement("td");   
            if(j==0){
                ceilInfo=document.createTextNode("ID");
            }
            else if(j==1){
                ceilInfo=document.createTextNode("NAME");        
            }
            else if(j==2){
                ceilInfo=document.createTextNode("CC");
            }
            else{
                ceilInfo=document.createTextNode("PHONE");
            }
            celda.appendChild(ceilInfo);
            hilera.appendChild(celda);
        }
        tblBody.append(hilera);
        table.appendChild(tblBody);
        patientsContainer.appendChild(table);

        var hilera = document.createElement("tr");
                for (var j = 0; j < 6; j++) {
                    var celda = document.createElement("td");   
                    if(j==0){
                        ceilInfo=document.createTextNode(patient.id);
                    }
                    else if(j==1){
                        ceilInfo=document.createTextNode(patient.name);        
                    }
                    else if(j==2){
                        ceilInfo=document.createTextNode(patient.cc);
                    }
                    else if(j==3){
                        ceilInfo=document.createTextNode(patient.phone);
                    }
                    else if(j==4){
                        ceilInfo=document.createElement("button");
                        textoBTN1=document.createTextNode("DELETE");
                        ceilInfo.appendChild(textoBTN1);
                        ceilInfo.addEventListener("click", function(){
                            remove(patient.id);
                        });
                    }
                    else{
                        ceilInfo=document.createElement("button");
                        textoBTN2=document.createTextNode("MODIFY");
                        ceilInfo.appendChild(textoBTN2);
                        ceilInfo.addEventListener("click", function(){
                            modifyPatient(patient);
                        });
                    }

                    celda.appendChild(ceilInfo);
                    hilera.appendChild(celda);
                }
            tblBody.append(hilera);
            table.appendChild(tblBody);
            patientsContainer.appendChild(table);

    }else{
        patientsContainer.innerHTML = '';
        alert(patient.description);
    }
    function modifyPatient(patient){
        let patientToString= JSON.stringify(patient);
        window.localStorage.setItem('patient', patientToString);
        window.location.href = "../ModificacionPacientes/ModifyPatients.html"
    }
}

function home(){
    location.href='../PrincipalPageDOCTOR/indexPagePrincipalDoctor.html';
}

function exit(){
    location.href='../LoginDoctor/Login.html';
    window.localStorage.removeItem('user');
}
function measurement(){
    location.href='../PaginaPrincipalMedicion/Meditions.html';
}

function patients(){
    location.href='../PagPpalPacientes/PaginaPacientes.html';
}

function filter(){
    let namePatient = inputFilterByName.value;
    if(namePatient!=""){
    getPatientfilter(namePatient);
    }
    else{
        patientsContainer.innerHTML = '';
        alert("Enter something please");
    }
   
}

async function getPatientfilter(namePatient) {
    let response = await fetch("http://localhost:8080/doctor/" + userJSON.id + "/filterPatients/" + namePatient, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let patients = await response.json();
    if (response.status == 200) {
        patientsContainer.innerHTML = '';
        let table = document.createElement("table");
        table.id = "miTabla";
        var tblBody = document.createElement("tbody");
        var ceilInfo;
        var textoBTN1;
        var textoBTN2;
        var hilera = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var celda = document.createElement("td");
            if (j == 0) {
                ceilInfo = document.createTextNode("ID");
            } else if (j == 1) {
                ceilInfo = document.createTextNode("NAME");
            } else if (j == 2) {
                ceilInfo = document.createTextNode("CC");
            } else {
                ceilInfo = document.createTextNode("PHONE");
            }
            celda.appendChild(ceilInfo);
            hilera.appendChild(celda);
        }
        tblBody.append(hilera);
        table.appendChild(tblBody);
        patientsContainer.appendChild(table);

        patients.forEach(patient => {
                var hilera = document.createElement("tr");
                for (var j = 0; j < 6; j++) {
                    var celda = document.createElement("td");
                    if (j == 0) {
                        ceilInfo = document.createTextNode(patient.id);
                    } else if (j == 1) {
                        ceilInfo = document.createTextNode(patient.name);
                    } else if (j == 2) {
                        ceilInfo = document.createTextNode(patient.cc);
                    } else if (j == 3) {
                        ceilInfo = document.createTextNode(patient.phone);
                    } else if (j == 4) {
                        ceilInfo = document.createElement("button");
                        textoBTN1 = document.createTextNode("DELETE");
                        ceilInfo.appendChild(textoBTN1);
                        ceilInfo.addEventListener("click", function () {
                            remove(patient.id);
                        });
                    } else {
                        ceilInfo = document.createElement("button");
                        textoBTN2 = document.createTextNode("MODIFY");
                        ceilInfo.appendChild(textoBTN2);
                        ceilInfo.addEventListener("click", function () {
                            modifyPatient(patient);
                        });
                    }

                    celda.appendChild(ceilInfo);
                    hilera.appendChild(celda);
                }
                tblBody.append(hilera);
                table.appendChild(tblBody);
                patientsContainer.appendChild(table);
            }
        )
    } else {
        patientsContainer.innerHTML = '';
        alert(patients.description);
    }



    async function remove(patientId) {
        let response = await fetch("http://localhost:8080/doctors/" + userJSON.id + "/patients/" + patientId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 204) {
            alert("Patient deleted successfully");
            filter(); // Refrescar la lista después de eliminar
        } else if (response.status === 404) {
            alert("Patient not found.");
        } else {
            alert("An error occurred while trying to delete the patient.");
        }
    }

    function modifyPatient(patient) {
        let patientToString = JSON.stringify(patient);
        window.localStorage.setItem('patient', patientToString);
        window.location.href = "../ModificacionPacientes/ModifyPatients.html";
    }
}
