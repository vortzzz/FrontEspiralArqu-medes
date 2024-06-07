//Autenticacion

let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
  location.href = "../LoginDoctor/Login.html";
  }
//Convierto string a objeto
else{
    userJSON=JSON.parse(userJSON);
}
//Botones de navegacion
const homeButton = document.getElementById('homeButton');
const exitButton = document.getElementById('exitButton');
const patientsButton = document.getElementById('patientsButton');
const inputFilterByName = document.getElementById('inputFilterByName');
const measurementButton = document.getElementById('measurementButton');

//Elementos de filtracion y busqueda
const filterBTN = document.getElementById('filterBTN');
const patientsContainer=document.getElementById('patientsContainer');
const searchBTN= document.getElementById('searchBTN');
const inputSearchByID = document.getElementById('inputSearchByID');
//Botono de creacion de paciente
const createPatientButton= document.getElementById('CreatePatient');
//ventanas emergentes y sus botones
const dialogCreate = document.getElementById('createPatientDialog');
const dialogModify = document.getElementById('ModifyPatientDialog');

//boton de ventana de creacion de paciente
const addButton= document.getElementById('addButton');
const cancelButtonCreate=document.getElementById('CancelButton');

//botones de modificacion de paciente
const modiffyButton= document.getElementById('ModiffyButton');
const cancelButtonModify= document.getElementById('CancelButtonModify')

//inputs de creacion de paciente
const patientName = document.getElementById('doctorInputName');
const patientEmail = document.getElementById('doctorInputEmail');
const patientCC = document.getElementById('doctorInputCC');
const patientPhone = document.getElementById('doctorInputPhone');
// inputs de modificacion de paciente
const newPatientName = document.getElementById('newPatientName');
const newPatientEmail= document.getElementById('newPatientEmail');
const newPatientPhone = document.getElementById('newPatientPhone');

//eventos de navegacion
homeButton.addEventListener('click',home);
exitButton.addEventListener('click',exit);
patientsButton.addEventListener("click",patients);
measurementButton.addEventListener('click',measurement);

//eventos de busqueda y filtro
filterBTN.addEventListener('click',filter);
searchBTN.addEventListener('click',search);
createPatientButton.addEventListener('click', () => {
    dialogCreate.showModal();
});
modiffyButton.addEventListener('click',modify);
cancelButtonModify.addEventListener('click',closeDialogModify);
addButton.addEventListener('click',addPatient);
cancelButtonCreate.addEventListener('click',closeDialogCreate);

getPatientList();

///Seach and filtrer
function search(){
    let ccPatient = inputSearchByID.value;
    if(ccPatient != ""){
     getPatientSearch(ccPatient);
    }
    else{
        alert("Ingrese algo por favor");
        location.href='PagPpalPacientes.html';
    }

}
//Remove
async function remove(patientId) {
    let response = await fetch("http://localhost:8080/doctors/" + userJSON.id + "/patients/" + patientId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 204) {
        alert("Paciente borrado correctamente");
        location.href='PagPpalPacientes.html';
    } else if (response.status === 404) {
        alert("Patient not found.");
    } else {
        alert("An error occurred while trying to delete the patient.");
    }
}

async function getPatientList(){
    let response= await fetch("http://localhost:8080/doctor/" +userJSON.id+ "/ListPatient",{
        method: 'GET',
        headers:{
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
        var textoBTN3;
        var hilera = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var celda = document.createElement("td");
            if (j == 0) {
                ceilInfo = document.createTextNode("ID");
            } else if (j == 1) {
                ceilInfo = document.createTextNode("NOMBRE");
            } else if (j == 2) {
                ceilInfo = document.createTextNode("CC");
            } else {
                ceilInfo = document.createTextNode("TELEFONO");
            }
            celda.appendChild(ceilInfo);
            hilera.appendChild(celda);
        }
        tblBody.append(hilera);
        table.appendChild(tblBody);
        patientsContainer.appendChild(table);

        patients.forEach(patient => {
                var hilera = document.createElement("tr");
                for (var j = 0; j < 7; j++) {
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
                        textoBTN1 = document.createTextNode("BORRAR");
                        ceilInfo.appendChild(textoBTN1);
                        ceilInfo.addEventListener("click", function () {
                            remove(patient.id);
                        });
                    } else if (j == 5){
                        ceilInfo = document.createElement("button");
                        textoBTN2 = document.createTextNode("MODIFICAR");
                        ceilInfo.appendChild(textoBTN2);
                        ceilInfo.addEventListener("click", function () {
                            modifyPatient(patient);
                        });
                    }else{
                        ceilInfo = document.createElement("button");
                        textoBTN3 = document.createTextNode("MEDICIONES");
                        ceilInfo.appendChild(textoBTN3);
                        ceilInfo.addEventListener("click", function () {
                          showMeasurements(patient);
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
        var textoBTN3;
        var hilera = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var celda = document.createElement("td");   
            if(j==0){
                ceilInfo=document.createTextNode("ID");
            }
            else if(j==1){
                ceilInfo=document.createTextNode("NOMBRE");        
            }
            else if(j==2){
                ceilInfo=document.createTextNode("CC");
            }
            else{
                ceilInfo=document.createTextNode("TELEFONO");
            }
            celda.appendChild(ceilInfo);
            hilera.appendChild(celda);
        }
        tblBody.append(hilera);
        table.appendChild(tblBody);
        patientsContainer.appendChild(table);

        var hilera = document.createElement("tr");
                for (var j = 0; j < 7; j++) {
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
                        textoBTN1=document.createTextNode("BORRAR");
                        ceilInfo.appendChild(textoBTN1);
                        ceilInfo.addEventListener("click", function(){
                            remove(patient.id);
                        });
                    }
                    else if(j==5){
                        ceilInfo=document.createElement("button");
                        textoBTN2=document.createTextNode("BORRAR");
                        ceilInfo.appendChild(textoBTN2);
                        ceilInfo.addEventListener("click", function(){
                            modifyPatient(patient);
                        });
                    }else{
                        ceilInfo = document.createElement("button");
                        textoBTN3 = document.createTextNode("MEDICIONES");
                        ceilInfo.appendChild(textoBTN3);
                        ceilInfo.addEventListener("click", function () {
                          showMeasurements(patient);
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
        getPatientList();
    }

}

function showMeasurements(patient) {
    // Crear el diálogo
    const dialog = document.createElement("dialog");
    dialog.innerHTML = `
      <h2>Mediciones del paciente ${patient.name}</h2>
      <ul id="measurements-list"></ul>
      <button class="close-dialog">X</button>
    `;
  
    fetch(`http://localhost:8080/patient/medition/${patient.cc}/${userJSON.id}`)
      .then(response => response.json())
      .then(measurements => {
        if (!Array.isArray(measurements)) return; // Ignore if not an array
        const measurementsList = dialog.querySelector("#measurements-list");
        measurements.forEach((measurement, index) => {
          const measurementItem = document.createElement("li");
          measurementItem.textContent = `${index + 1}:${measurement.dateTaken}`;
          measurementItem.dataset.measurementId = measurement.id;
          measurementsList.appendChild(measurementItem);
        });
  
        measurementsList.addEventListener("click", event => {
          if (event.target.tagName === "LI") {
            const measurementId = event.target.dataset.measurementId;
            viewMedition(patient.cc, measurementId);
            dialog.close(); // Cerrar el diálogo
          }
        });
  
        // Agregar evento de click al botón de cierre del diálogo
        const closeButton = dialog.querySelector(".close-dialog");
        closeButton.addEventListener("click", () => {
          dialog.close(); // Cerrar el diálogo
        });
      })
      .catch(error => {}); 
  
    // Mostrar el diálogo
    document.body.appendChild(dialog);
    dialog.showModal();
  }

  async function viewMedition(pacienteInput,medicionid){
    let response = await fetch("http://localhost:8080/patient/searchmedition/"+medicionid,{
        method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }, 
        });
    let medicion = await response.json();
    const medicionString = JSON.stringify(medicion);

    // Guardar los datos en el almacenamiento local
    localStorage.setItem('pacienteInput', pacienteInput);
    localStorage.setItem('medition', medicionString);
    localStorage.setItem('meditionid', medicionid);
    window.location.href = "../visualizacionMediciones/visualizacion.html";
}


function modifyPatient(patient){
    let patientToString= JSON.stringify(patient);
    window.localStorage.setItem('patient', patientToString);
    dialogModify.showModal();   
    getInfo(patient);  
}

function closeDialogModify(){
    dialogModify.close();
}



function getInfo(patient){
    newPatientName.value=patient.name;
    newPatientEmail.value=patient.email;
    newPatientPhone.value=patient.phone;
}


function modify(event){
    let patient= window.localStorage.getItem('patient');
    let patientJSON=JSON.parse(patient);
    if(newPatientName.value===""||newPatientEmail.value===""||newPatientPhone.value===""){
        alert("Digite todos los campos porfavor")
        event.preventDefault();
    }
    else{
        let patient  = {
            name: newPatientName.value, 
            email : newPatientEmail.value,
            phone : newPatientPhone.value,
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



function home(){
    location.href='../PrincipalPageDOCTOR/indexPagePrincipalDoctor.html';
}

function exit(){
    location.href='../LoginDoctor/Login.html';
    localStorage.clear();
}
function measurement(){
    location.href='../PaginaPrincipalMedicion/PaginaPrincipalMedicion.html';
}

function patients(){
    location.href='../PagPpalPacientes/PagPpalPacientes.html';
}

function filter(){
    let namePatient = inputFilterByName.value;
    if(namePatient!=""){
    getPatientfilter(namePatient);
    }
    else{
        patientsContainer.innerHTML = '';
        alert("Ingrese algo por favor");
        location.href='PagPpalPacientes.html';

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
        var textoBTN3;
        var hilera = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var celda = document.createElement("td");
            if (j == 0) {
                ceilInfo = document.createTextNode("ID");
            } else if (j == 1) {
                ceilInfo = document.createTextNode("NOMBRE");
            } else if (j == 2) {
                ceilInfo = document.createTextNode("CC");
            } else {
                ceilInfo = document.createTextNode("TELEFONO");
            }
            celda.appendChild(ceilInfo);
            hilera.appendChild(celda);
        }
        tblBody.append(hilera);
        table.appendChild(tblBody);
        patientsContainer.appendChild(table);

        patients.forEach(patient => {
                var hilera = document.createElement("tr");
                for (var j = 0; j < 7; j++) {
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
                        textoBTN1 = document.createTextNode("BORRAR");
                        ceilInfo.appendChild(textoBTN1);
                        ceilInfo.addEventListener("click", function () {
                            remove(patient.id);
                        });
                    } else if(j==5) {
                        ceilInfo = document.createElement("button");
                        textoBTN2 = document.createTextNode("MODIFICAR");
                        ceilInfo.appendChild(textoBTN2);
                        ceilInfo.addEventListener("click", function () {
                            modifyPatient(patient);
                        });
                    }else{
                        ceilInfo = document.createElement("button");
                        textoBTN3 = document.createTextNode("MEDICIONES");
                        ceilInfo.appendChild(textoBTN3);
                        ceilInfo.addEventListener("click", function () {
                          showMeasurements(patient);
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
        getPatientList();
    }

}

function addPatient(event) {
    event.preventDefault();

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
}


function closeDialogCreate(){
    dialogCreate.close();
}









