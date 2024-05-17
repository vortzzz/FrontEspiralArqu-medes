//Validación de autenticación
//let userJSON= window.localStorage.getItem('user');

//if(userJSON===null){
    //location.href = "../LoginDoctor/logIn.html"; 
  //}


const homeButton = document.getElementById('button_home');
const exitButton = document.getElementById('button_exit');

const commentsInput = document.getElementById('commentsInput');
const addButton = document.getElementById('addButton');
const CommentsContainer = document.getElementById('CommentsContainer');
const graphicsContainer= document.getElementById('graphicsContainer'); 

const pacienteInput = localStorage.getItem('pacienteInput');
const medicionString  = localStorage.getItem('medition');
const medicionid = localStorage.getItem('meditionid');

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
getGraphics(); 



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

        userSubtitle.innerHTML = user.comments; //<small>***</small>
      
        CommentsContainer.appendChild(userContainer);
        
    }); 

}

async function getGraphics() {
    let response = await fetch('http://localhost:8080/doctor/patient/medition/' + medicionid);
    let magnitudesAndTimes = await response.json();
    if (response.ok) {
        
        graphics(magnitudesAndTimes);
    } else {
        alert(magnitudesAndTimes.body)
    }
}

function graphics(magnitudesAndTimes) {
    const magnitudes = magnitudesAndTimes.magnitudes;
    const times = magnitudesAndTimes.times;

    const canvas = document.createElement("canvas");
    graphicsContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: times,
            datasets: [{
                label: "Magnitudes",
                data: magnitudes,
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 2, // Aumenta el grosor de la línea
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Tiempo',
                        color: 'black',
                        font: {
                            size: 22 // Tamaño de fuente para el título del eje X
                        }
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            size: 15 // Tamaño de fuente para las etiquetas del eje X
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Magnitudes',
                        color: 'black',
                        font: {
                            size: 22 // Tamaño de fuente para el título del eje Y
                        }
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            size: 15 // Tamaño de fuente para las etiquetas del eje Y
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 22 // Tamaño de fuente para la etiqueta del conjunto de datos
                        }
                    }
                }
            }
        }
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
    window.location.href = "visualizacion.html";

}

        
        



