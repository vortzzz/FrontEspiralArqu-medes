//Validación de autenticación
//let userJSON= window.localStorage.getItem('user');

//if(userJSON===null){
    //location.href = "../LoginDoctor/logIn.html"; 
  //}


const homeButton = document.getElementById('button_home');
const exitButton = document.getElementById('button_exit');
const patientButton = document.getElementById('button_patients')
const measurementButton = document.getElementById('button_measurements') 
const commentsInput = document.getElementById('commentsInput');
const addButton = document.getElementById('addButton');
const CommentsContainer = document.getElementById('CommentsContainer');
const graphicsContainer= document.getElementById('graphicsContainer'); 
const graphicsContainer2= document.getElementById('graphicsContainer2'); 

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
measurementButton.addEventListener('click', measurement);
exitButton.addEventListener('click', exit);
addButton.addEventListener('click',addComment);
patientButton.addEventListener('click', patients)



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

function patients(){
    location.href='../PagPpalPacientes/PaginaPacientes.html';
}

function measurement(){
    location.href='../PaginaPrincipalMedicion/Meditions.html';
}


async function getCommets(){
    
    let response = await fetch('http://localhost:8080/patient/medition/comments/'+ medicionid); //HTTP Requ
    let users = await response.json();

    console.log(users);
    users.forEach( user => {
        
        let userContainer = document.createElement('div'); //<div></div>
        let userSubtitle = document.createElement('span'); //<small></small>

        userContainer.appendChild(userSubtitle); //<div><h3></h3><small></small></div>

        userSubtitle.innerHTML = user.comment; //<small>***</small>
      
        CommentsContainer.appendChild(userContainer);
        
    }); 

}

async function getGraphics() {
    let response = await fetch('http://localhost:8080/doctor/patient/medition/' + medicionid);
    let arraysGraphics = await response.json();
    if (response.ok) {
        
        graphicsMagnitudesAndTimes(arraysGraphics);
        graphisSpectrumFreqs(arraysGraphics); 
    } else {
        alert(arraysGraphics.body)
    }
}

function graphicsMagnitudesAndTimes(magnitudesAndTimes) {
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
                borderWidth: 2, 
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
                        text: 'Time',
                        color: 'black',
                        font: {
                            size: 22 
                        }
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            size: 15 
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Magnitudes',
                        color: 'black',
                        font: {
                            size: 22 
                        }
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            size: 15
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 22 
                        }
                    }
                }
            }
        }
    });
}

function graphisSpectrumFreqs(arraysGraphics){

    const spectrum = arraysGraphics.spectrum;
    const freqs = arraysGraphics.freqs;

    const canvas = document.createElement("canvas");
    graphicsContainer2.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: freqs,
            datasets: [{
                label: "Spectrum",
                data: spectrum,
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 2, 
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
                        text: 'frequency',
                        color: 'black',
                        font: {
                            size: 22 
                        }
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            size: 15 
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Spectrum',
                        color: 'black',
                        font: {
                            size: 22 
                        }
                    },
                    ticks: {
                        color: 'black',
                        font: {
                            size: 15
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 22 
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