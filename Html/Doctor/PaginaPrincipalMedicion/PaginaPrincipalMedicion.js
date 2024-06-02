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
const measurementButton = document.getElementById('measurementButton');
const inputSearchByCC= document.getElementById('inputSearchByCC');
const filterBTN = document.getElementById('filterBTN');
const measurementContainer=document.getElementById('measurementContainer');
const searchBTN=document.getElementById("searchBTN");
const selection=document.getElementById('selection');
const divContainer=document.getElementById('divContainer');
const newMeasurementForm = document.getElementById('newMeasurementForm');
const patientSelect = document.getElementById('patientSelect');
const deviceSelect = document.getElementById('deviceSelect');
const newMeasurement = document.getElementById('addmedition');
const start=document.getElementById('start-button');
let timerInterval=0;
var date1 ='';
var date2 ='';
var text ='';

homeButton.addEventListener('click',home);
exitButton.addEventListener('click',exit);
measurementButton.addEventListener('click',measurement);
selection.addEventListener('change',changeInput);
searchBTN.addEventListener('click',search);
patientsButton.addEventListener("click",patients);
newMeasurement.addEventListener("click",addMedition);
start.addEventListener('click', cronometror); 

getListMedition();

document.getElementById('nuevaMedicion').addEventListener('click', async function() {
    patientSelect.innerHTML = '';
    deviceSelect.innerHTML = '';
  
    if(newMeasurementForm.style.display=='flex'){
        newMeasurementForm.style.display = 'none';
    }else{
        newMeasurementForm.style.display = 'flex';
  
        let response = await fetch("http://localhost:8080/doctor/devices/"+userJSON.id,{
            method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }, 
            });
        let devices = await response.json();
    
        let response1 = await fetch("http://localhost:8080/doctor/"+userJSON.id+"/ListPatient",{
            method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }, 
            });
        let patients = await response1.json();

      
            patients.forEach(patient => {
              const option = document.createElement('option');
              option.text = patient.cc;
              option.value = patient.cc;
              patientSelect.appendChild(option);
            });
      
            devices.forEach(device => {
              const option = document.createElement('option');
              option.text = device.name;
              option.value = device.name;
              deviceSelect.appendChild(option);
            });
    }});


function home(){
    location.href='../PrincipalPageDOCTOR/indexPagePrincipalDoctor.html';
}

function exit(){
    location.href='../LoginDoctor/Login.html';
    window.localStorage.removeItem('user');
}

function patients(){
    location.href='../PagPpalPacientes/PagPpalPacientes.html';
}

function measurement(){
    location.href='../PaginaPrincipalMedicion/PaginaPrincipalMedicion.html';
}


function search(){
    date1.value='';
    date2.value='';
    text.value='';  
    let patientCC=inputSearchByCC.value;
    if(patientCC!==""){
        searchByCC(patientCC);
    }
    else{
        alert("Please fill the field");
        measurementContainer.innerHTML = '';
        getListMedition();
    }
    
}

async function getListMedition(){
    let response = await fetch('http://localhost:8080/doctor/'+userJSON.id+'/Listmeasurement', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let measurement= await response.json();
    getMeasurementfilter(measurement,response);
}

async function searchByCC(patientCC){
    let response = await fetch('http://localhost:8080/doctor/'+userJSON.id+'/measurement/filterByCC/' + patientCC, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let measurement= await response.json();
    getMeasurementfilter(measurement,response);
}


async function remove(meditionId){
    let response = await fetch ('http://localhost:8080/doctor/deleteMedition/' +meditionId,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
    },
    });
    alert(await response.text());
    window.location.href = "../FiltradoMediciones/measurementFilter.html"
}



function changeInput(){
    divContainer.innerHTML = '';
    if(selection.value==="byDate"){
        date1=document.createElement("input");
        date2=document.createElement("input");
        date1.type="date";
        date2.type="date";
        date1.className="input2";
        date2.className="input2";
        var btn=document.createElement("button");
        btn.className="minibuttons";
        btn.textContent="FILTER";
        btn.addEventListener('click',function(){
            filter1(date1,date2);
        });
        divContainer.appendChild(date1);
        divContainer.appendChild(date2);
        divContainer.appendChild(btn);
    }
    else if(selection.value==="byNamePatient"){
        text=document.createElement("input");
        text.id="text";
        text.className="input2";
        text.placeholder="patientName"
        var btn=document.createElement("button");
        btn.className="minibuttons";
        btn.textContent="FILTER";
        btn.addEventListener('click',function(){
            filter2(text);
        });
        divContainer.appendChild(text);
        divContainer.appendChild(btn);

    }
    else{
        alert("Please select a type of filtering")
    }
}

async function filter1(date1,date2){
    inputSearchByCC.value=''; 
    if(date1.value!==''&&date2.value!==''){
    let response = await fetch("http://localhost:8080/doctor/"+userJSON.id+"/measurement/filterByDate/"+date1.value+"/"+date2.value,{
        method: 'GET',
            headers:{
               'Content-Type': 'application/json'
             }, 
         });
        let measurement= await response.json();
        getMeasurementfilter(measurement,response);
    }
    else{
        getListMedition();
        alert("Please fill all fields")
    }
}

async function filter2(text){
    inputSearchByCC.value=''; 
    if(text.value!==''){
    let response = await fetch("http://localhost:8080/doctor/"+userJSON.id+"/measurement/filterByName/"+text.value,{
        method: 'GET',
            headers:{
               'Content-Type': 'application/json'
             }, 
         });
        let measurement= await response.json();
        getMeasurementfilter(measurement,response);
    }
    else{
        getListMedition();
        alert("Please fill all fields")
    }
}


async function getMeasurementfilter(measurement,response){
    if(response.status==200){
        measurementContainer.innerHTML = '';    
        let table = document.createElement("table");
        table.id = "miTabla";
        var tblBody = document.createElement("tbody");
        var ceilInfo;
        var textoBTN1;
        var textoBTN2;
        var hilera = document.createElement("tr");
        for (var j = 0; j < 3; j++) {
            var celda = document.createElement("td");   
            if(j==0){
                ceilInfo=document.createTextNode("ID");
            }
            else if(j==1){
                ceilInfo=document.createTextNode("PATIENT");        
            }
            else{
                ceilInfo=document.createTextNode("DATE TAKEN");
            }
            celda.appendChild(ceilInfo);
            hilera.appendChild(celda);
        }
        tblBody.append(hilera);
        table.appendChild(tblBody);
        measurementContainer.appendChild(table);

        measurement.forEach(measurement =>{
                var hilera = document.createElement("tr");
                for (var j = 0; j < 5; j++) {
                    var celda = document.createElement("td");   
                    if(j==0){
                        ceilInfo=document.createTextNode(measurement.id);
                    }
                    else if(j==1){
                        ceilInfo=document.createTextNode(measurement.patient.name);        
                    }
                    else if(j==2){
                        ceilInfo=document.createTextNode(measurement.dateTaken);
                    }
                    else if(j==3){
                        ceilInfo=document.createElement("button");
                        textoBTN1=document.createTextNode("DELETE");
                        ceilInfo.appendChild(textoBTN1);
                        ceilInfo.addEventListener("click", function(){
                            remove(measurement.id);
                        });
                    }
                    else{
                        ceilInfo=document.createElement("button");
                        textoBTN2=document.createTextNode("MODIFY");
                        ceilInfo.appendChild(textoBTN2);
                        ceilInfo.addEventListener("click", function(){
                            editMeasurement(measurement);
                        });
                    }

                    celda.appendChild(ceilInfo);
                    hilera.appendChild(celda);
                }
            tblBody.append(hilera);
            table.appendChild(tblBody);
            measurementContainer.appendChild(table);
        }
    )}
    else{
        measurementContainer.innerHTML = '';
        alert(measurement.description);
        getListMedition();
    }
    function editMeasurement(measurement){
        window.localStorage.setItem('medition', JSON.stringify(measurement))
        window.localStorage.setItem('medicionid', measurement.id);
        window.localStorage.setItem('pacienteInput', measurement.patient.cc);
        window.location.href = "../VisualizacionMediciones/visualizacion.html"
    }

}

//AÑADIR MEDICION

function addMedition() {

    let cc = patientSelect.value;
    let device=deviceSelect.value;
    let dateTaken = new Date();
    
    if(cc==="" || device===""){
        alert("Digite todos los campos, por favor")
    } else{
    let medition  = {
        dateTaken: dateTaken
       }

    postMeditionAdd(cc,medition,device);
    }
}


async function postMeditionAdd(cc,medition,device){

    let id= userJSON.id;
    let response = await fetch('http://localhost:8080/patient/medition/getDevice/'+id+"/"+device);
    let device1= await response.json();
    if(response.ok){
        let json = JSON.stringify(medition);

        response = await fetch('http://localhost:8080/medition/'+cc+"/create",{
           method: 'POST',
           headers:{
               'Content-Type': 'application/json'
           }, 
           body: json
       });
       let medition1 = await response.json();
       if (response.ok){
           let meditionD= JSON.stringify(medition1);
           let objDevice= JSON.stringify(device1);
           window.localStorage.setItem('device',objDevice);
           window.localStorage.setItem('medition',meditionD);
           openDialog();
       }else{
           alert("error");
       }
   
    }else{
        if(response.status === 401) {
            alert(message.description);
         } else {
             console.error('Request error: ', response.status);
             alert('An error occurred in the request. Please try again later.');
         }
    }
}

function openDialog(){
    document.getElementById('medicionDialog').showModal();
}

 function closeDialog() {
    if (!isCronometrorRunning) { 
        document.getElementById('medicionDialog').close();
        document.getElementById('time-value').textContent = '0:00';
        clearInterval(timerInterval);
    } else {
        alert("Cannot close the dialog while the cronometor is running.");
    }
}

async function cronometror() {
    let timeValueElement = document.getElementById('time-value');
    let deviceJson = JSON.parse(window.localStorage.getItem('device'));
    let medition = JSON.parse(window.localStorage.getItem('medition'));


    if (timeValueElement.textContent == '0:00') {
        let startTime = new Date().getTime(); 
        let response = await fetch('http://localhost:8080/device/' + deviceJson.name + '/startMedition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let response1 = await fetch('http://localhost:8080/patient/medition/' + patientSelect.value +'/'+ userJSON.id);

        if (response.ok & response1.ok) {
          
            isCronometrorRunning = true; 
            connectMeasure("on");
            function updateTime() {
                let currentTime = new Date().getTime();
                let elapsedTime = currentTime - startTime; // Tiempo transcurrido desde el inicio
                let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)); // Minutos
                let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000); // Segundos

                if (elapsedTime >= 10000) {
                    connectMeasure("off");
                    clearInterval(timerInterval);
                    seconds = 5;
                    isCronometrorRunning = false; 
                    let response =  fetch('http://localhost:8080/device/' + deviceJson.name + '/stopMedition', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    viewMedition(patientSelect.value,medition,medition.id);
                }
                if(elapsedTime <= 6000){
                    timeValueElement.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
                }
               
            }

            timerInterval = setInterval(updateTime, 1000);
        } else {
            alert(await response.text());
        }
    } else {
         alert(await response.text());
        document.getElementById('time-value').textContent = '0:00';
        clearInterval(timerInterval);
        isCronometrorRunning = false; 
    }
}

async function connectMeasure(status) {
    let medition = JSON.parse(window.localStorage.getItem('medition'));
    let device = JSON.parse(window.localStorage.getItem('device'));
    var host = "broker.emqx.io";
    var port = 8083;
    var path = '/mqtt';
    var clientId = 'doctor'+userJSON.id;
    var client = new Paho.MQTT.Client(host, port, path, clientId);
    var connectOptions = {
        onSuccess: function () {
            client.unsubscribe("#", {
                onSuccess: function () {
                    client.subscribe("medition/"+device.name, {
                        onSuccess: function () {
                            console.log("subscribed to " + "medition/"+device.name);
                            
                            let text =status+"/"+ medition.id;
                            message = new Paho.MQTT.Message(text);
                            message.destinationName = "medition/"+device.name;
                            client.send(message);
                        }
                    });
                }
            });
        },
        onFailure: function () {
         }
    };

    client.connect(connectOptions);

}

function viewMedition(pacienteInput,medicion,medicionid){

    // Convertir el objeto a una cadena JSON
    const medicionString = JSON.stringify(medicion);


    // Guardar los datos en el almacenamiento local
    localStorage.setItem('pacienteInput', pacienteInput);
    localStorage.setItem('medition', medicionString);
    localStorage.setItem('meditionid', medicionid);
    window.location.href = "../visualizacionMediciones/visualizacion.html";
}

