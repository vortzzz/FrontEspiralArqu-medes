const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const exitButton = document.getElementById('exitButton');
const doctorInput = document.getElementById('doctorInput');
const deleteButton = document.getElementById('deleteButton');
const doctorsContainer = document.getElementById('doctorsContainer');

//Eventos

homeButton.addEventListener('click',goHome);
doctorsButton.addEventListener('click',goDoctorsSeccion);
exitButton.addEventListener('click', exit);
deleteButton.addEventListener('click',deleteDoctor);


//Acciones iniciales:

getListDoctors();

async function getListDoctors(){
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

    }
    ); 
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
    alert("Doctor eliminado correctamente")
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
}
