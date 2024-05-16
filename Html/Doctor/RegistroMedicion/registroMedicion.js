//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
       location.href = "../LoginDoctor/logIn.html"; 
}else{
    userJSON=JSON.parse(userJSON);
}


const homeButton = document.getElementById('button_home');
const exitButton = document.getElementById('button_exit');
const pacienteInput = document.getElementById('pacienteInput');
const searchButton = document.getElementById('searchButton');
const MedicionContainer = document.getElementById('MedicionContainer');
const SearchResultContainer = document.getElementById('SearchResultContainer');
const start=document.getElementById('start-button');
const newMeasurent= document.getElementById('nuevaMedicion');
const searchButtonDevice= document.getElementById('searchButtonDevice');
const inputDevice = document.getElementById('DeviceInput');

let timerInterval=0;

//Eventos

homeButton.addEventListener('click', goHome);
exitButton.addEventListener('click', exit);
searchButton.addEventListener('click', searchPaciente);
start.addEventListener('click', cronometror); 
newMeasurent.addEventListener('click', addMedition); 
searchButtonDevice.addEventListener('click',searchDevice);

let isCronometrorRunning = false;  // Variable de estado para controlar si el cronómetro está activo

// Acciones iniciales:

function exit(){
    window.location.href = "../LoginDoctor/logIn.html"; 
    window.localStorage.removeItem('user');
}

function goHome(){
    window.location.href = "../principalPageDoctor/index.html";
}



async function searchPaciente(){
    let pacienteValue = pacienteInput.value;
    await getPacientSearch(pacienteValue);
    //window.location.href = "registroMedicion.html" ???????????????????????????????????
}
async function searchDevice(){
    let deviceValue = inputDevice.value;
    await getDeviceSearch(deviceValue);
   
}

async function getDeviceSearch(deviceValue){
    let id= userJSON.id;
    let response = await fetch('http://localhost:8080/patient/medition/getDevice/'+id+"/"+deviceValue);
    if(response.ok){
        alert("device found");
        
    }else{
        if(response.status === 401) {
            alert("No matches in device for doctor");
         } else {
             console.error('Request error: ', response.status);
             alert('An error occurred in the request. Please try again later.');
         }
    }
}

async function getPacientSearch(pacienteInput) {
    
    let response = await fetch('http://localhost:8080/patient/medition/' + pacienteInput +'/'+ userJSON.id);

    let mediciones = await response.json();
    if(response.ok){

       mediciones.forEach( medicion => {
        SearchResultContainer.innerHTML = '';
            
        let MedicionFoundContainer = document.createElement('div');
        let patientName = document.createElement('h3');
        let dateMedition = document.createElement('small');
        let buttonView = document.createElement('button');

        MedicionFoundContainer.appendChild(patientName);
        MedicionFoundContainer.appendChild(dateMedition);
        MedicionFoundContainer.appendChild(buttonView)

        patientName.innerHTML = pacienteInput;
        dateMedition.innerHTML = "fecha: " +  medicion.dateTaken;
        buttonView.innerHTML = "Ver"; 

        buttonView.addEventListener('click',function(){
            viewMedition(pacienteInput,medicion,medicion.id);
        })

        SearchResultContainer.appendChild(MedicionFoundContainer);
    }); 
    } else{
        alert(mediciones.description); 
    }
    
    }

function viewMedition(pacienteInput,medicion,medicionid){

    // Convertir el objeto a una cadena JSON
    const medicionString = JSON.stringify(medicion);


    // Guardar los datos en el almacenamiento local
    localStorage.setItem('pacienteInput', pacienteInput);
    localStorage.setItem('medicion', medicionString);
    localStorage.setItem('medicionid', medicionid);
    window.location.href = "../visualizacionMediciones/visualizacion.html";
}


function viewMedition(pacienteInput,medicion,medicionid){

    // Convertir el objeto a una cadena JSON
    const medicionString = JSON.stringify(medicion);


    // Guardar los datos en el almacenamiento local
    localStorage.setItem('pacienteInput', pacienteInput);
    localStorage.setItem('medicion', medicionString);
    localStorage.setItem('medicionid', medicionid);
    window.location.href = "../visualizacionMediciones/visualizacion.html";
}


function addMedition() {

    let cc = pacienteInput.value;
    let device=inputDevice.value;
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
           alert("bobo hp");
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



    if (timeValueElement.textContent == '0:00') {
        let startTime = new Date().getTime(); 
        let response = await fetch('http://localhost:8080/device/' + deviceJson.name + '/startMedition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let response1 = await fetch('http://localhost:8080/patient/medition/' + pacienteInput.value +'/'+ userJSON.id);

        if (response.ok & response1) {
          
            isCronometrorRunning = true; 
            connectMeasure("on");
            function updateTime() {
                let currentTime = new Date().getTime();
                let elapsedTime = currentTime - startTime; // Tiempo transcurrido desde el inicio
                let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)); // Minutos
                let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000); // Segundos

                if (elapsedTime >= 5000) {
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
                }

                timeValueElement.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
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


function connectMeasure(status) {
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



