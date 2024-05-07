//Autenticacion

// let userJSON= window.localStorage.getItem('user');

// if(userJSON===null){
//     location.href = "../LoginAdmin/Untitled-1.html";
//   }
// //Convierto string a objeto
// else{
//     userJSON=JSON.parse(userJSON);
// }

const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const inputFilterByName = document.getElementById('inputFilterByName');
const filterBTN = document.getElementById('filterBTN');
const patientsContainer=document.getElementById('patientsContainer');


filterBTN.addEventListener('click',filter)

function filter(){
    let namePatient = inputFilterByName.value;
    getPatientfilter(namePatient); 
}

async function getPatientfilter(namePatient){
    let response = await fetch("http://localhost:8080/doctor/52/filterPatients/"+namePatient,{
    method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }, 
    });
    let patients= await response.json();
    console.log(response);
    if(response.status==200){
        patientsContainer.innerHTML = '';
        let table = document.createElement("table");
        table.id = "miTabla";
        var tblBody = document.createElement("tbody");
        var textoCelda;
        var hilera = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var celda = document.createElement("td");   
            if(j==0){
                textoCelda=document.createTextNode("ID");
            }
            else if(j==1){
                textoCelda=document.createTextNode("NAME");        
            }
            else if(j==2){
                textoCelda=document.createTextNode("CC");
            }
            else{
                textoCelda=document.createTextNode("PHONE");
            }
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        tblBody.append(hilera);
        table.appendChild(tblBody);
        patientsContainer.appendChild(table);

        patients.forEach(patient =>{
                var hilera = document.createElement("tr");
                for (var j = 0; j < 4; j++) {
                    var celda = document.createElement("td");   
                    if(j==0){
                        textoCelda=document.createTextNode(patient.id);
                    }
                    else if(j==1){
                        textoCelda=document.createTextNode(patient.name);        
                    }
                    else if(j==2){
                        textoCelda=document.createTextNode(patient.cc);
                    }
                    else{
                        textoCelda=document.createTextNode(patient.phone);
                    }
                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);
                }
            tblBody.append(hilera);
            table.appendChild(tblBody);
            patientsContainer.appendChild(table);
        }
    )}
    else{
        patientsContainer.innerHTML = '';
        setTimeout(function() {
        alert(patients.description);
        }, 0); 
    }
}
