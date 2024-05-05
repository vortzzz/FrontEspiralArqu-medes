//Autenticacion

let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginAdmin/Untitled-1.html";
  }
//Convierto string a objeto
else{
    userJSON=JSON.parse(userJSON);
}

const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const inputFilterByName = document.getElementById('inputFilterByName');
const filterBTN = document.getElementById('filterBTN');
const patientsContainer=document.getElementById('patientsContainer');


filterBTN.addEventListener('click',filter)

function filter(){
    let namePatient = inputFilterByName.value;
    getPatientfilter(namePatient); 
}

async function getPatientfilter(namePatient){
    let response = await fetch("http://localhost:8080/doctor/453/filterPatients/"+namePatient,{
    method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }, 
    });
    let patients= await response.json();
    console.log(response);
    if(response.status==200){
        patients.forEach(patient =>{
        
            let userContainer = document.createElement('div');
            let userTitle = document.createElement('h3');
            let userSubtitle = document.createElement('small');
            let space = document.createElement('br');
            let userSubtitle2 = document.createElement('small');
            
    
            userContainer.appendChild(userTitle);
            userContainer.appendChild(userSubtitle);  
            userContainer.appendChild(space);
            userContainer.appendChild(userSubtitle2); 
    
            userTitle.innerHTML = patient.name; 

            userSubtitle.innerHTML ="Cedula: " + patient.cc; 
    
            userSubtitle2.innerHTML ="Telefono: " + patient.phone;
    
            patientsContainer.appendChild(userContainer);
        }
    )}
    else{
        alert(patients.description);
    }
}
