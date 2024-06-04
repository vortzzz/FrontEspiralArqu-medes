//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginAdmin/Untitled-1.html";
  }

const homeButton = document.getElementById('homeButton');
const exitButton = document.getElementById('exitButton');
const doctorButton = document.getElementById('DoctorButton');
const DeviceButton = document.getElementById('DeviceButton');


const doctorInput = document.getElementById('inputSearchByID');
const searchButton = document.getElementById('searchBTN');

const doctorContainer=document.getElementById("doctorContainer");

//creacion de doctor
const createDoctorButton= document.getElementById('CreateDoctor');
const dialogCreate = document.getElementById('createDoctorDialog');
//boton de ventana de creacion de doctor
const addButton= document.getElementById('addButton');
const cancelButtonCreate=document.getElementById('CancelButton');

//inputs de creacion de doctor
const patientName = document.getElementById('doctorInputName');
const patientEmail = document.getElementById('doctorInputEmail');
const patientCC = document.getElementById('doctorInputCC');
const patientPhone = document.getElementById('doctorInputPhone');


// Eventos

homeButton.addEventListener('click', goHome);
exitButton.addEventListener('click', exit);
DeviceButton.addEventListener('click', goDevice);
searchButton.addEventListener('click', searchDoctor);
createDoctorButton.addEventListener('click', () => {
    dialogCreate.showModal();
});

addButton.addEventListener('click',addDoctor);
cancelButtonCreate.addEventListener('click',closeDialogCreate)
getDoctorList();

function exit(){
    window.location.href = "../LoginAdmin/Untitled-1.html";
    window.localStorage.removeItem('user');
}

function goHome() {
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}

function goDevice() {
    window.location.href = "../CreacionDeDispositvo/Create.html";
}

function searchDoctor() {
    let ccDoctor = doctorInput.value;
    if(ccDoctor != ""){
        postDoctorSearch(ccDoctor);
       }
    
}

async function postDoctorSearch(doctorSearch) {
    let response = await fetch('http://localhost:8080/doctor/search/' + doctorSearch, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let doctor = await response.json();
    if (response.ok) {
        doctorContainer.innerHTML = '';
        let table = document.createElement("table");
        table.id = "miTabla";
        var tblBody = document.createElement("tbody");
        var ceilInfo;
        var textoBTN1;
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
        doctorContainer.appendChild(table);

        var hilera = document.createElement("tr");
                for (var j = 0; j < 6; j++) {
                    var celda = document.createElement("td");   
                    if(j==0){
                        ceilInfo=document.createTextNode(doctor.id);
                    }
                    else if(j==1){
                        ceilInfo=document.createTextNode(doctor.name);        
                    }
                    else if(j==2){
                        ceilInfo=document.createTextNode(doctor.cc);
                    }
                    else if(j==3){
                        ceilInfo=document.createTextNode(doctor.phone);
                    }
                    else{
                        ceilInfo=document.createElement("button");
                        textoBTN1=document.createTextNode("DELETE");
                        ceilInfo.appendChild(textoBTN1);
                        ceilInfo.addEventListener("click", function(){
                            remove(patient.id);
                        });
                    }

                    celda.appendChild(ceilInfo);
                    hilera.appendChild(celda);
                }
            tblBody.append(hilera);
            table.appendChild(tblBody);
            doctorContainer.appendChild(table);

    }else{
        doctorContainer.innerHTML = '';
        alert(doctor.description);
        getDoctorList();
    }


}


async function getDoctorList(){
    let response= await fetch("http://localhost:8080/doctor/list",{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }, 
    }); 

    let doctors = await response.json();
    if (response.status == 200) {
        doctorContainer.innerHTML = '';
        let table = document.createElement("table");
        table.id = "miTabla";
        var tblBody = document.createElement("tbody");
        var ceilInfo;
        var textoBTN1;
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
        doctorContainer.appendChild(table);

        doctors.forEach(doctor => {
                var hilera = document.createElement("tr");
                for (var j = 0; j < 5; j++) {
                    var celda = document.createElement("td");
                    if (j == 0) {
                        ceilInfo = document.createTextNode(doctor.id);
                    } else if (j == 1) {
                        ceilInfo = document.createTextNode(doctor.name);
                    } else if (j == 2) {
                        ceilInfo = document.createTextNode(doctor.cc);
                    } else if (j == 3) {
                        ceilInfo = document.createTextNode(doctor.phone);
                    } else {
                        ceilInfo = document.createElement("button");
                        textoBTN1 = document.createTextNode("DELETE");
                        ceilInfo.appendChild(textoBTN1);
                        ceilInfo.addEventListener("click", function () {
                            remove(doctor.cc);
                        });
                    }
                    celda.appendChild(ceilInfo);
                    hilera.appendChild(celda);
                }
                tblBody.append(hilera);
                table.appendChild(tblBody);
                doctorContainer.appendChild(table);
            }
        )
    } else {
        doctorContainer.innerHTML = '';
        alert(doctors.description);
    }
}

async function remove(doctorcc){
    let json = JSON.stringify(doctorcc);
    let response = await fetch('http://localhost:8080/doctor/delete/'+doctorcc,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: json
    });
    let doctor = await response.json();
    console.log(doctor);
   if(response.ok) {
    let user= JSON.stringify(doctor);
    alert("doctor eliminado correctamente");
    getDoctorList(); 
    } else {
    if(response.status === 400) {
        alert(doctor.doctorCc);
    } else {
        console.error('Error en la solicitud:', response.status);
        alert('Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
    }
}


function addDoctor() {

    let name = patientName.value;
    let cc = patientCC.value;
    let phone = patientPhone.value;
    let email = patientEmail.value;
    
    if(name===""|| cc===""|| email==="" ||phone===""){
        alert("Digite todos los campos, por favor")
    } else{
    let doctor  = {
        name: name, 
        cc : cc,
        email : email,
        phone : phone,
       }

    postDoctorAdd(doctor);
    }
}

async function postDoctorAdd(doctorAdd){
    let json = JSON.stringify(doctorAdd);

    let response = await fetch('http://localhost:8080/doctor/create',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: json
    });
    let doctor = await response.json();
    alert(doctor.description);
}

function closeDialogCreate(){
    dialogCreate.close();
    getDoctorList();
}
