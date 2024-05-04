//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginDoctor/logIn.html"; 
  }


const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const exitButton = document.getElementById('exitButton');
const pacienteInput = document.getElementById('doctorInput');
const searchButton = document.getElementById('searchButton');
const MedicionContainer = document.getElementById('MedicionContainer');

//Eventos

homeButton.addEventListener('click',goHome);
doctorsButton.addEventListener('click',goDoctorsSeccion);
exitButton.addEventListener('click', exit);
searchButton.addEventListener('click',searchPaciente);


//Acciones iniciales:



function exit(){
    window.location.href = "../LoginDoctor/logIn.html"; 
    window.localStorage.removeItem('user');

}
function goDoctorsSeccion(){
    window.location.href = "../principalPageDoctor/index.html";

}


function goHome(){
    window.location.href = "../principalPageDoctor/index.html";
}
async function searchPaciente(){
    let pacienteInput = pacienteInput.value;
    getPacientSearch(pacienteInput);

}
async function getPacientSearch(pacienteInput) {
    let json = JSON.stringify(pacienteInput); 
    let response = await fetch('http://localhost:8080/paciente/mediciones/' + pacienteInput);
        let medicion = await response.json();
        users.forEach( medicion => {
            MedicionContainer.innerHTML = '';
            
            let MedicionFoundContainer = document.createElement('div');
            let patientName = document.createElement('h3');
            let dateMedition = document.createElement('small');
            let buttonView = document.createElement('button');


            MedicionFoundContainer.appendChild(patientName);
            MedicionFoundContainer.appendChild(dateMedition);
            MedicionFoundContainer.appendChild(buttonView)


            doctorName.innerHTML = medicion.patientName;
            doctorCC.innerHTML = "fecha: " +  medicion.dateMedition;
            buttonView.innerHTML = "Ver"; 

            buttonView.addEventListener('click',function(){
                viewMedition(medicion);
            })
        


            searchResultsContainer.appendChild(MedicionFoundContainer);

        }
        );
    }

    function viewMedition(medicion){
        window.location.href = "../visualizacionMediciones/visualizacion.html";
    }

        
        



