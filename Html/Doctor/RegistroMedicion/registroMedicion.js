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
const end=document.getElementById('end-button');
const newMeasurent= document.getElementById('nuevaMedicion');
const searchButtonDevice= document.getElementById('searchButtonDevice');
const inputDevice = document.getElementById('DeviceInput');

let timerInterval=0;

//Eventos

homeButton.addEventListener('click', goHome);
exitButton.addEventListener('click', exit);
searchButton.addEventListener('click', searchPaciente);
start.addEventListener('click', cronometror); 
end.addEventListener('click', endCronometror); 
newMeasurent.addEventListener('click', addMedition); 
searchButtonDevice.addEventListener('click',searchDevice);

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
    let cc= userJSON.
    let response = await fetch('http://localhost:8080/patient/medition/'+)
}

async function getPacientSearch(pacienteInput) {
    
    let response = await fetch('http://localhost:8080/patient/medition/' + pacienteInput + userJSON.id);

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

async function getPacientSearch(pacienteInput) {
    
    let response = await fetch('http://localhost:8080/patient/medition/' + pacienteInput);

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


function addMedition() {

    let cc = pacienteInput.value;
    let dateTaken = new Date();
    
    if(cc===""){
        alert("Digite todos los campos, por favor")
    } else{
    let medition  = {
        dateTaken: dateTaken
       }

    postMeditionAdd(cc,medition);
    }
}

async function postMeditionAdd(cc,medition){

    let json = JSON.stringify(medition);

    let response = await fetch('http://localhost:8080/medition/'+cc+"/create",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: json
    });
    let medition1 = await response.json();
    if (response.ok){
        let meditionD= JSON.stringify(medition1);
        window.localStorage.setItem('medition',meditionD);
        openDialog();
    }else{
        alert("bobo hp");
    }

}



 function openDialog(){
    document.getElementById('medicionDialog').showModal();
}

 function closeDialog() {
    document.getElementById('medicionDialog').close();
    document.getElementById('time-value').textContent = '0:00'; 
    clearInterval(timerInterval); 
}



async function cronometror(){ 
    
    let timeValueElement = document.getElementById('time-value');
    if( timeValueElement.textContent == '0:00'){
        let startTime = new Date().getTime(); // Tiempo inicial

        let response = await fetch('http://localhost:8080/device/Device-00 /startMedition',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
         });

         let data= await response.json();
        
        // Función para actualizar el tiempo en el elemento
        function updateTime() {
            let currentTime = new Date().getTime(); 
            let elapsedTime = currentTime - startTime; // Tiempo transcurrido desde el inicio
            let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)); // Minutos
            let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000); // Segundos
            timeValueElement.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0'); // Formato MM:SS
        }
    
        // Actualizar el tiempo cada segundo
        timerInterval = setInterval(updateTime, 1000);
    }else{
        document.getElementById('time-value').textContent = '0:00'; 
        clearInterval(timerInterval); 
    }

}

async function endCronometror(){
    clearInterval(timerInterval); 

    let response = await fetch('http://localhost:8080/device/Device-00 /stopMedition',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
     });

     let data= await response.json();
}
