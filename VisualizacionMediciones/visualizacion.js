//Validación de autenticación
//let userJSON= window.localStorage.getItem('user');

//if(userJSON===null){
    //location.href = "../LoginDoctor/logIn.html"; 
  //}


const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const exitButton = document.getElementById('exitButton');
const pacienteInput = document.getElementById('doctorInput');
const searchButton = document.getElementById('searchButton');
const CommentsContainer = document.getElementById('CommentsContainer');

//Eventos

homeButton.addEventListener('click',goHome);
doctorsButton.addEventListener('click',goDoctorsSeccion);
exitButton.addEventListener('click', exit);
searchButton.addEventListener('click',searchPaciente);


//Acciones iniciales:
getCommets();



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

async function getCommets(){
    let response = await fetch('http://localhost:8080/paciente/mediciones/comentarios'); //HTTP Requ
    let users = await response.json();

    users.forEach( user => {
        
        let userContainer = document.createElement('div'); //<div></div>
        let userSubtitle = document.createElement('small'); //<small></small>



        userContainer.appendChild(userSubtitle); //<div><h3></h3><small></small></div>



        userSubtitle.innerHTML = user.commets; //<small>***</small>
      


        CommentsContainer.appendChild(userContainer);
        
    }); 
}

        
        



