const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const exitButton = document.getElementById('exitButton');
const doctorInput = document.getElementById('doctorInput');
const deleteButton = document.getElementById('deleteButton');


//Eventos

homeButton.addEventListener('click',goHome);
doctorsButton.addEventListener('click',goDoctorsSeccion());
exitButton.addEventListener('click', goBack());
deleteButton.addEventListener('click',deleteDoctor);



function goBack(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";

}
function goDoctorsSeccion(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";


}


function goHome(){

}


function deleteDoctor() {
    let doctorDelete = doctorInput.value;


    postDoctorDelete(doctorDelete);
}

async function postDoctorDelete(doctorDelete){
    let json = JSON.stringify(doctorDelete);

    let response = await fetch('https://46ad-200-3-193-78.ngrok-free.app/doctor/delete',{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: json
    });
}
