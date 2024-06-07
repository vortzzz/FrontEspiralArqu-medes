//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginAdmin/Untitled-1.html";
  }

const homeButton = document.getElementById('homeButton');
const exitButton = document.getElementById('exitButton');
const doctorButton=document.getElementById('DoctorButton');
const name = document.getElementById('Name');
const addButton = document.getElementById('addButton');
const assign = document.getElementById('ASSIGN');
const deviceInfoContainer = document.getElementById('device-info-container');
const dropdownContent =document.getElementById('dropdown-content');  
const doctorInfoContainer = document.getElementById('doctor-info-container');
const deviceContainer= document.getElementById('deviceContainer');





//Eventos
assign.addEventListener('click',asignDevice);
addButton.addEventListener('click',addDevice);
doctorButton.addEventListener('click', goDoctor)
homeButton.addEventListener('click',goHome);
exitButton.addEventListener('click', exit);

getDiviceList();


function exit(){
    window.location.href = "../LoginAdmin/Untitled-1.html";
    localStorage.clear();
}

function goHome(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}

function goDoctor(){
    window.location.href = "../PageOfDoctor/paginaSearch.html";
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

async function postDeviceAdd(device) {
    let json = JSON.stringify(device);

    try {
        let response = await fetch('http://localhost:8080/device/createDevice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        let data = await response.json();

        if (response.ok) {
            let device = JSON.stringify(data);
            window.localStorage.setItem('device', device);
            alert(data.description);
            window.location.href = "../CreacionDeDispositvo/Create.html";
        } else {
            if (response.status === 401) {
                alert(data.description);
            } else {
                console.error('Request error:', response.status);
                alert('Un error ha ocurrido por favor intente más tarde.');
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Un error ha ocurrido por favor intente más tarde.');
    }
}

function asignDevice(){
    document.getElementById('assigDevice').showModal();
    deviceInfoContainer.innerHTML = '';
    doctorInfoContainer.innerHTML = '';
    getListDevice();
    
}
function closeDialog() {
    dropdownContent.innerHTML = '';
    document.getElementById('assigDevice').close();
}


async function getListDevice(){
    let response = await fetch('http://localhost:8080/device/list');
    let devices= await response.json();

 
    devices.forEach(device => {
        const link = document.createElement('a'); 
        link.href = '#'; 
        link.textContent = device.name; 
        link.setAttribute('data-device-id', device.id); 
        link.addEventListener('click',(event) => {
            event.preventDefault();
            const deviceId = event.target.getAttribute('data-device-id');
            const selectedDevice = devices.find(d => d.id === parseInt(deviceId));
            displaySelectedDevice(selectedDevice);
          });
        dropdownContent.appendChild(link); 
    });
}

async function displaySelectedDevice(device) {
    deviceInfoContainer.innerHTML = '';
    getListDoctor();
    const deviceName = document.createElement('p');
    deviceName.textContent = device.name;
    deviceInfoContainer.appendChild(deviceName);

    const deviceInput = document.createElement('input');
    deviceInput.type = 'text';
    deviceInput.textContent = "CC of doctor";
    deviceInfoContainer.appendChild(deviceInput);
  
    const selectButton = document.createElement('button');
    selectButton.textContent = 'Selecccionar';
    selectButton.addEventListener('click', async () => {
        let ccdoctor=deviceInput.value;
        if(ccdoctor===""){
            alert("Digite la cedula de un doctor");
        } else {
            let json= JSON.stringify(device);
            let response = await fetch('http://localhost:8080/device/AssignDevice/'+ccdoctor,{
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body: json
             });
             let data= await response.json();
             if(response.ok) {
                alert("Asignado");
             }else{
                alert(data.description);
             }

        }
      
      });
    deviceInfoContainer.appendChild(selectButton);
  }

  async function getListDoctor(){
    doctorInfoContainer.innerHTML='';
    let response = await fetch('http://localhost:8080/doctor/listDoctors')
    let doctors= await response.json();
    doctors.forEach(doctor =>{
        let userContainer = document.createElement('div');
        let userTitle = document.createElement('h3');
        let userSubtitle = document.createElement('small');
        let space = document.createElement('br');
        let userSubtitle2 = document.createElement('small');
        

        userContainer.appendChild(userTitle);
        userContainer.appendChild(userSubtitle);  
        userContainer.appendChild(space);
        userContainer.appendChild(userSubtitle2); 

        userTitle.innerHTML = doctor.name; 
        userSubtitle.innerHTML ="Cedula: " + doctor.cc; 

        userSubtitle2.innerHTML ="Telefono: " +doctor.phone;

        doctorInfoContainer.appendChild(userContainer);

    }); 
}


async function getDiviceList(){
    let response = await fetch('http://localhost:8080/device/list');
    let devices= await response.json(); 
    
    if (response.status == 200) {
        deviceContainer.innerHTML = '';
        let table = document.createElement("table");
        table.id = "miTabla";
        var tblBody = document.createElement("tbody");
        var ceilInfo;
        var textoBTN1;
        var hilera = document.createElement("tr");
        for (var j = 0; j < 3; j++) {
            var celda = document.createElement("td");
            if (j == 0) {
                ceilInfo = document.createTextNode("ID");
            } else if (j == 1){
                ceilInfo = document.createTextNode("NOMBRE");
            }else{
                ceilInfo = document.createTextNode("DOCTOR"); 
            }
            celda.appendChild(ceilInfo);
            hilera.appendChild(celda);
        }
        tblBody.append(hilera);
        table.appendChild(tblBody);
        deviceContainer.appendChild(table);

        devices.forEach(device => {
                var hilera = document.createElement("tr");
                for (var j = 0; j < 4; j++) {
                    var celda = document.createElement("td");
                    if (j == 0) {
                        ceilInfo = document.createTextNode(device.id);
                    } else if (j == 1) {
                        ceilInfo = document.createTextNode(device.name);
                    } else if (j == 2) {
                        if(device.doctor==null){
                          ceilInfo = document.createTextNode("Sin Asignar");
                        }else{
                            ceilInfo = document.createTextNode(device.doctor.cc);
                        } 
                    } else {
                        ceilInfo = document.createElement("button");
                        textoBTN1 = document.createTextNode("BORRAR");
                        ceilInfo.appendChild(textoBTN1);
                        ceilInfo.addEventListener("click", function () {
                            remove(device.name);
                        });
                    }
                    celda.appendChild(ceilInfo);
                    hilera.appendChild(celda);
                }
                tblBody.append(hilera);
                table.appendChild(tblBody);
                deviceContainer.appendChild(table);
            }
        )
    } else {
        deviceContainer.innerHTML = '';
        alert(doctors.description);
    }
}


async function remove(name){
    let response = await fetch('http://localhost:8080/device/deleteDevice/'+name,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    });
   if(response.ok) {
    getDiviceList();
    } else {
    if(response.status === 400) {
        alert(response.text());
    } else {
        console.error('Error en la solicitud:', response.status);
        alert('Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
    }
}









