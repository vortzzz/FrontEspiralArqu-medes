const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const exitButton = document.getElementById('exitButton');
const doctorInput = document.getElementById('doctorInput');
const deleteButton = document.getElementById('deleteButton');


//Eventos

homeButton.addEventListener('click',goHome);
doctorsButton.addEventListener('click',goDoctorsSeccion);
exitButton.addEventListener('click', exit);
deleteButton.addEventListener('click',deleteDoctor);



function exit(){
    //Volver a sign up

}
function goDoctorsSeccion(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html"

}


function goHome(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}


function deleteDoctor() {
    let doctorDelete = doctorInput.value;
    postDoctorDelete(doctorDelete);
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
