//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginDoctor/logIn.html"; 
  }


const homeButton = document.getElementById('button_home');
const exitButton = document.getElementById('button_exit');

const commentsInput = document.getElementById('commentsInput');
const addButton = document.getElementById('addButton');
const CommentsContainer = document.getElementById('CommentsContainer');

const pacienteInput = localStorage.getItem('pacienteInput');
const medicionString  = localStorage.getItem('medicion');
const medicionid = localStorage.getItem('medicionid');

// Convertir la cadena JSON a un objeto
console.log(medicionString);
const medicion = JSON.parse(medicionString);




document.getElementById('paciente').textContent = pacienteInput;
document.getElementById('fecha').textContent = medicion.dateTaken;


//Eventos

homeButton.addEventListener('click',goHome);
exitButton.addEventListener('click', exit);
addButton.addEventListener('click',addComment);


//Acciones iniciales:
getCommets();



function exit(){
    window.location.href = "../LoginDoctor/logIn.html"; 
    window.localStorage.removeItem('user');

}


function goHome(){
    window.location.href = "../principalPageDoctor/index.html";
}

async function getCommets(){
    
    let response = await fetch('http://localhost:8080/patient/medition/comments/'+ medicionid); //HTTP Requ
    let users = await response.json();

    users.forEach( user => {
        
        let userContainer = document.createElement('div'); //<div></div>
        let userSubtitle = document.createElement('small'); //<small></small>



        userContainer.appendChild(userSubtitle); //<div><h3></h3><small></small></div>



        userSubtitle.innerHTML = user.commets; //<small>***</small>
      


        CommentsContainer.appendChild(userContainer);
        
    }); 

}

 function addComment(){
    let comment = commentsInput.value; 
    if(comment===""){
        alert("digite un comentario valido");
    }else{
        postCommentAdd(comment,medicionid);
    }

}

async function postCommentAdd(comment,medicionid){
    console.log(comment)
    let commentobj = {
        comment: comment 
    }

    let json = JSON.stringify(commentobj);

    let response = await fetch('http://localhost:8080/patient/addmedition/'+ medicionid,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: json

    })
    console.log(response); 
    let comment1 = await response.json();
    console.log(comment1); 
    //window.location.href = "visualizacion.html";

}

        
        



