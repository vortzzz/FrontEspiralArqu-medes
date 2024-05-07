//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginAdmin/Untitled-1.html";
  }

const homeButton = document.getElementById('homeButton');
const exitButton = document.getElementById('exitButton');
const name = document.getElementById('Name');
const addButton = document.getElementById('addButton');
const assign = document.getElementById('ASSIGN');



//Eventos
//assign.addEventListener('click',asignDevice);
addButton.addEventListener('click',addDevice);
homeButton.addEventListener('click',goHome);
exitButton.addEventListener('click', exit);

function exit(){
    window.location.href = "../LoginAdmin/Untitled-1.html";
    window.localStorage.removeItem('user');
}

function goHome(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}


function addDevice() {
    let deviceName = name.value;
    
    if(deviceName===""){
        alert("Digite todos los campos, por favor");
    } else {
        let device  = {
            name: deviceName
        };
        postDeviceAdd(device);
    }
}

async function postDeviceAdd(device){
    let json = JSON.stringify(device);

    let response = await fetch('http://localhost:8080/device/createDevice',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: json
    });
    let data = await response.json();
    if(response.ok) {
        let device= JSON.stringify(data);
        window.localStorage.setItem('device',device);
        alert(data.description);

    }else {
    if(response.status === 401) {
        alert(data.description);
    } else {
        console.error('Request error:', response.status);
        alert('An error occurred in the request. Please try again later.');
    }
   }
}



