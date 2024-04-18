const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const exitButton = document.getElementById('exitButton');
const doctorName = document.getElementById('doctorName');
const doctorEmail = document.getElementById('doctorEmail');
const doctorCC = document.getElementById('doctorCC');
const doctorPhone = document.getElementById('doctorPhone');
const addButton = document.getElementById('addButton');


//Eventos
addButton.addEventListener('click',addDoctor);
homeButton.addEventListener('click',goHome);
doctorsButton.addEventListener('click',goDoctorsSeccion);
exitButton.addEventListener('click', exit);


function exit(){
    window.location.href = "../LoginAdmin/Untitled-1.html"
}
function goDoctorsSeccion(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html"

}

function goHome(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}


function addDoctor() {

    let name = doctorName.value;
    let email = doctorEmail.value;
    let cc = doctorCC.value;
    let phone = doctorPhone.value;
    
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
    let msg=JSON.stringify(doctor);
    msg=msg.replace("description","").replace("{","").replace("}","").replace(":","").replace(/"/g,"");
    alert(msg);
    window.location.href = "paginaAdd.html";
}



