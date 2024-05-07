//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    //    location.href = "../LoginDoctor/logIn.html"; 
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

let timerInterval=0;

//Eventos

homeButton.addEventListener('click', goHome);
exitButton.addEventListener('click', exit);
searchButton.addEventListener('click', searchPaciente);
start.addEventListener('click', cronometror); 
end.addEventListener('click', endCronometror); 
newMeasurent.addEventListener('click', openDialog); 

// Acciones iniciales:

function exit(){
    window.location.href = "../LoginDoctor/logIn.html"; 
    window.localStorage.removeItem('user');
}

function goHome(){
    window.location.href = "../principalPageDoctor/index.html";
}

async function searchPaciente(){
    let pacienteInput = pacienteInput.value;
    await getPacientSearch(pacienteInput);
    window.location.href = "registroMedicion.html"
}

async function getPacientSearch(pacienteInput) {
    let json = JSON.stringify(pacienteInput); 
    let response = await fetch('http://localhost:8080/patient/medition/' + pacienteInput,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: json

    });
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

 function openDialog(){
    document.getElementById('medicionDialog').showModal();
}

 function closeDialog() {
    document.getElementById('medicionDialog').close();
    document.getElementById('time-value').textContent = '0:00'; 
    clearInterval(timerInterval); 
}

function cronometror(){ 
    let timeValueElement = document.getElementById('time-value');
    let startTime = new Date().getTime(); // Tiempo inicial

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
}

function endCronometror(){
    clearInterval(timerInterval); 
}
