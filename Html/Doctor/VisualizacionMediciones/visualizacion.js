//Validación de autenticación
//let userJSON= window.localStorage.getItem('user');

//if(userJSON===null){
    //location.href = "../LoginDoctor/logIn.html"; 
  //}


const homeButton = document.getElementById('button_home');
const exitButton = document.getElementById('button_exit');
const patientButton = document.getElementById('button_patients') 
const commentsInput = document.getElementById('commentsInput');
const addButton = document.getElementById('addButton');
const CommentsContainer = document.getElementById('CommentsContainer');
const graphicsContainer= document.getElementById('graphicsContainer'); 
const graphicsContainer2= document.getElementById('graphicsContainer2'); 
const graphicsContainer3= document.getElementById('graphicsContainer3'); 

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
        graphiscircular(arraysGraphics);
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
function graphiscircular(arraysGraphics) {
    const spectrum = arraysGraphics.spectrum;
    const freqs = arraysGraphics.freqs;

    const canvas = document.createElement("canvas");
    canvas.width = 700;
    canvas.height = 700;
    graphicsContainer3.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 250; // Ajustado para que la gráfica sea más grande

    ctx.clearRect(0, 0, width, height);

    // se dibuja la circunferencia de guia xddd
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    
    const lineWidth = 2; // ancho de la linea

  
    const xPoints = [];
    const yPoints = [];
    for (let i = 0; i < spectrum.length; i++) {
        const angle = (i / spectrum.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const spectrumValue = spectrum[i] / 256;
        const lineLength = spectrumValue * 700;  // Ajustado para que las líneas sean más largas

        const x2 = centerX + (radius + lineLength) * Math.cos(angle);
        const y2 = centerY + (radius + lineLength) * Math.sin(angle);

        xPoints.push(x2);
        yPoints.push(y2);

        if (i === 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
        } else {
            ctx.lineTo(x2, y2);
        }
    }
    ctx.strokeStyle = 'red'; 
    ctx.lineWidth = lineWidth; 
    ctx.stroke();

    
    const specificLabels = [0,5, 10, 15, 20, 25];
    const threshold = 0.1;

    for (let i = 0; i < spectrum.length; i++) {
        const angle = (i / spectrum.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        if (specificLabels.some(label => Math.abs(freqs[i] - label) <= threshold)) {
            ctx.fillStyle = 'black';
            ctx.font = '12px sans-serif';
            const textX = x + 40 * Math.cos(angle);
            const textY = y + 40 * Math.sin(angle);
            ctx.fillText(freqs[i].toFixed(0) + " Hz", textX, textY);
        }
    }

   
    ctx.beginPath();
    ctx.moveTo(xPoints[0], yPoints[0]);
    ctx.lineTo(xPoints[xPoints.length - 1], yPoints[yPoints.length - 1]);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    
    ctx.font = '16px sans-serif';
    ctx.fillStyle = 'black';
    ctx.fillText('Spectrum (Red)', 10, height - 20);

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