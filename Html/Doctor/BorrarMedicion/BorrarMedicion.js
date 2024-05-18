//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginDoctor/LogIn.html"; 
  }


const homeButton = document.getElementById('homeButton');
const patientsButton = document.getElementById('patientsButton');
const exitButton = document.getElementById('exitButton');
const doctorInput = document.getElementById('doctorInput');
const deleteButton = document.getElementById('deleteButton');
const testsContainer = document.getElementById('testsContainer');

//Eventos

homeButton.addEventListener('click',goHome);
doctorsButton.addEventListener('click',goDoctorsSeccion);
exitButton.addEventListener('click', exit);
deleteButton.addEventListener('click',deleteDoctor);


//Acciones iniciales:

getListDoctor();

function exit(){
    window.location.href = "../LoginAdmin/Untitled-1.html"
    window.localStorage.removeItem('user');
}


async function getListDoctor(){ //tf is this for
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

        doctorsContainer.appendChild(userContainer);

    }); 
}


function exit(){
    window.location.href = "../LoginAdmin/Untitled-1.html"

}
function goDoctorsSeccion(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html"

}


function goHome(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}


async function deleteDoctor() {
    let doctorDelete = doctorInput.value;
    await postDoctorDelete(doctorDelete);
    window.location.href = "paginadelete.html";
}

async function postDoctorDelete(doctorDelete){
    let json = JSON.stringify(doctorDelete);
    let response = await fetch('http://localhost:8080/doctor/delete/'+doctorDelete,{
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
    } else {
    if(response.status === 400) {
        alert(doctor.doctorCc);
    } else {
        console.error('Error en la solicitud:', response.status);
        alert('Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
    }
}
